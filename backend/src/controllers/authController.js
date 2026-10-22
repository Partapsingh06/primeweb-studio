import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import User from '../models/User.js';
import PasswordResetToken from '../models/PasswordResetToken.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { sendEmail } from '../utils/mailer.js';

// Generate JWT token
const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'dev_jwt_secret_fallback_key_32', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// Send JWT via HTTP-only cookie & return response
const sendTokenResponse = (user, statusCode, res, message = 'Success') => {
  const token = signToken(user._id, user.role);

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  };

  res.cookie('token', token, cookieOptions);

  return res.status(statusCode).json({
    success: true,
    message,
    token, // Provided for frontend API headers if desired
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        company: user.company,
        avatar: user.avatar,
        status: user.status,
      },
    },
  });
};

/**
 * Register Client
 * Prevents client from escalating to admin
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, company } = req.body;

    if (!name || !email || !password) {
      return errorResponse(res, 'Please provide name, email, and password.', 400);
    }

    if (!validator.isEmail(email)) {
      return errorResponse(res, 'Please provide a valid email address.', 400);
    }

    if (password.length < 8) {
      return errorResponse(res, 'Password must be at least 8 characters long.', 400);
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return errorResponse(res, 'An account with this email address already exists.', 409);
    }

    // Role is strictly forced to 'client' for public registration
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: 'client',
      phone: phone || '',
      company: company || '',
    });

    return sendTokenResponse(user, 201, res, 'Client account registered successfully.');
  } catch (error) {
    next(error);
  }
};

/**
 * Login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 'Please provide email and password.', 400);
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return errorResponse(res, 'Invalid email or password.', 401);
    }

    if (user.status === 'suspended') {
      return errorResponse(res, 'Account has been suspended. Please contact agency support.', 403);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorResponse(res, 'Invalid email or password.', 401);
    }

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    return sendTokenResponse(user, 200, res, 'Logged in successfully.');
  } catch (error) {
    next(error);
  }
};

/**
 * Logout
 */
export const logout = (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  return successResponse(res, 'Logged out successfully.');
};

/**
 * Get current authenticated user
 */
export const getMe = async (req, res) => {
  return successResponse(res, 'User session loaded.', { user: req.user });
};

/**
 * Update Profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, company, avatar } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (company !== undefined) user.company = company;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();

    return successResponse(res, 'Profile updated successfully.', { user });
  } catch (error) {
    next(error);
  }
};

/**
 * Change Password
 */
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return errorResponse(res, 'Please provide both current and new passwords.', 400);
    }

    if (newPassword.length < 8) {
      return errorResponse(res, 'New password must be at least 8 characters long.', 400);
    }

    const user = await User.findById(req.user._id).select('+password');
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return errorResponse(res, 'Incorrect current password.', 400);
    }

    user.password = newPassword;
    await user.save();

    return successResponse(res, 'Password changed successfully.');
  } catch (error) {
    next(error);
  }
};

/**
 * Forgot Password
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return errorResponse(res, 'Please provide your email address.', 400);
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Return neutral response for security to prevent user enumeration
      return successResponse(res, 'If that email is registered, password reset instructions have been dispatched.');
    }

    // Generate random reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Remove existing tokens for this user
    await PasswordResetToken.deleteMany({ userId: user._id });

    // Save token with 1-hour expiration
    await PasswordResetToken.create({
      userId: user._id,
      tokenHash,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

    const mailResult = await sendEmail({
      to: user.email,
      subject: 'PrimeWeb Studio — Password Reset Request',
      text: `Hello ${user.name},\n\nYou requested a password reset. Please click the link below to set a new password:\n${resetUrl}\n\nThis link is valid for 1 hour.\nIf you did not make this request, you can safely ignore this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #DDD6FE; border-radius: 8px;">
          <h2 style="color: #6D28D9;">PrimeWeb Studio</h2>
          <p>Hello <strong>${user.name}</strong>,</p>
          <p>You requested a password reset for your PrimeWeb Studio account.</p>
          <p style="margin: 24px 0;">
            <a href="${resetUrl}" style="background-color: #7C3AED; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a>
          </p>
          <p style="color: #64748B; font-size: 14px;">This link will expire in 60 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `,
    });

    if (!mailResult.sent) {
      return res.status(200).json({
        success: true,
        message: 'Password reset token generated. Note: Email service is not configured on the server. Please consult server administrator.',
        emailConfigured: false,
        devResetToken: process.env.NODE_ENV !== 'production' ? resetToken : undefined,
      });
    }

    return successResponse(res, 'Password reset instructions have been sent to your email.');
  } catch (error) {
    next(error);
  }
};

/**
 * Reset Password
 */
export const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return errorResponse(res, 'Reset token and new password are required.', 400);
    }

    if (newPassword.length < 8) {
      return errorResponse(res, 'New password must be at least 8 characters long.', 400);
    }

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const tokenRecord = await PasswordResetToken.findOne({
      tokenHash,
      expiresAt: { $gt: new Date() },
    });

    if (!tokenRecord) {
      return errorResponse(res, 'Invalid or expired password reset link.', 400);
    }

    const user = await User.findById(tokenRecord.userId);
    if (!user) {
      return errorResponse(res, 'User account not found.', 404);
    }

    user.password = newPassword;
    await user.save();

    // Delete token once used
    await PasswordResetToken.deleteOne({ _id: tokenRecord._id });

    return successResponse(res, 'Password has been reset successfully. You can now log in.');
  } catch (error) {
    next(error);
  }
};

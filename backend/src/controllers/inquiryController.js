import crypto from 'crypto';
import validator from 'validator';
import Inquiry from '../models/Inquiry.js';
import Notification from '../models/Notification.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { sendEmail } from '../utils/mailer.js';

// Helper to generate reference numbers like PWS-202610-8F92
const generateReferenceNumber = () => {
  const dateStr = new Date().toISOString().slice(0, 7).replace('-', '');
  const randomHex = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `PWS-${dateStr}-${randomHex}`;
};

/**
 * Public: Submit Inquiry / Contact Form / Quote Request
 */
export const createInquiry = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      companyName,
      serviceRequired,
      estimatedBudget,
      projectTimeline,
      projectDescription,
      preferredContactMethod,
    } = req.body;

    if (!fullName || !email || !projectDescription) {
      return errorResponse(res, 'Full name, email, and project description are required.', 400);
    }

    if (!validator.isEmail(email)) {
      return errorResponse(res, 'Please provide a valid email address.', 400);
    }

    if (projectDescription.trim().length < 10) {
      return errorResponse(res, 'Please provide at least 10 characters describing your project.', 400);
    }

    const referenceNumber = generateReferenceNumber();

    // Check if user is logged in
    const clientId = req.user ? req.user._id : null;

    const inquiry = await Inquiry.create({
      referenceNumber,
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone ? phone.trim() : '',
      companyName: companyName ? companyName.trim() : '',
      serviceRequired: serviceRequired || 'Business Website Development',
      estimatedBudget: estimatedBudget || '₹5,000 - ₹15,000',
      projectTimeline: projectTimeline || 'Within 2-4 weeks',
      projectDescription: projectDescription.trim(),
      preferredContactMethod: preferredContactMethod || 'Email',
      status: 'New',
      priority: 'Medium',
      client: clientId,
      ipAddress: req.ip || req.headers['x-forwarded-for'] || '',
    });

    // Create admin notification
    await Notification.create({
      title: 'New Client Inquiry Received',
      message: `${fullName} requested a quote for ${serviceRequired}. Ref: ${referenceNumber}`,
      type: 'inquiry',
      link: `/admin/leads`,
    });

    // Optional email dispatch (safe if not configured)
    await sendEmail({
      to: email,
      subject: `PrimeWeb Studio — Inquiry Received (${referenceNumber})`,
      text: `Hello ${fullName},\n\nThank you for reaching out to PrimeWeb Studio! We have received your project inquiry for "${serviceRequired}".\nYour reference number is: ${referenceNumber}.\n\nOur team will review your requirements and respond shortly.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #DDD6FE; border-radius: 8px;">
          <h2 style="color: #6D28D9;">PrimeWeb Studio</h2>
          <p>Hello <strong>${fullName}</strong>,</p>
          <p>Thank you for contacting us regarding <strong>${serviceRequired}</strong>.</p>
          <div style="background-color: #F5F3FF; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; color: #475569;">Your Project Reference Number:</p>
            <h3 style="margin: 5px 0 0 0; color: #7C3AED; letter-spacing: 1px;">${referenceNumber}</h3>
          </div>
          <p>Our team will review your details and reach out via your preferred method (${preferredContactMethod || 'Email'}).</p>
          <p style="color: #64748B; font-size: 13px;">PrimeWeb Studio — Your Vision. Our Creation.</p>
        </div>
      `,
    });

    return successResponse(
      res,
      'Your inquiry has been submitted successfully. Our team will review your project and get back to you shortly.',
      {
        referenceNumber,
        inquiryId: inquiry._id,
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Client: Get client's own inquiries
 */
export const getMyInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find({
      $or: [{ client: req.user._id }, { email: req.user.email.toLowerCase() }],
    }).sort({ createdAt: -1 });

    return successResponse(res, 'Inquiries retrieved.', { inquiries });
  } catch (error) {
    next(error);
  }
};

/**
 * Client: Get specific inquiry detail
 */
export const getMyInquiryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findOne({
      _id: id,
      $or: [{ client: req.user._id }, { email: req.user.email.toLowerCase() }],
    });

    if (!inquiry) {
      return errorResponse(res, 'Inquiry record not found or access denied.', 404);
    }

    return successResponse(res, 'Inquiry details loaded.', { inquiry });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Get all inquiries with filters & search
 */
export const getAllInquiriesAdmin = async (req, res, next) => {
  try {
    const { status, priority, search, page = 1, limit = 25 } = req.query;
    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (priority && priority !== 'All') {
      query.priority = priority;
    }

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { referenceNumber: { $regex: search, $options: 'i' } },
        { serviceRequired: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const total = await Inquiry.countDocuments(query);
    const inquiries = await Inquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10))
      .populate('client', 'name email phone');

    return successResponse(res, 'All inquiries loaded for admin.', {
      inquiries,
      pagination: {
        total,
        page: parseInt(page, 10),
        pages: Math.ceil(total / parseInt(limit, 10)),
        limit: parseInt(limit, 10),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Update Inquiry status / notes / priority
 */
export const updateInquiryAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      return errorResponse(res, 'Inquiry not found.', 404);
    }

    const { status, priority, adminResponse, internalNote } = req.body;

    if (status) inquiry.status = status;
    if (priority) inquiry.priority = priority;
    if (adminResponse !== undefined) inquiry.adminResponse = adminResponse;

    if (internalNote && internalNote.trim()) {
      inquiry.internalNotes.push({
        note: internalNote.trim(),
        author: req.user.name || 'Admin',
        createdAt: new Date(),
      });
    }

    await inquiry.save();

    return successResponse(res, 'Inquiry updated successfully.', { inquiry });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Delete Inquiry
 */
export const deleteInquiryAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findByIdAndDelete(id);

    if (!inquiry) {
      return errorResponse(res, 'Inquiry not found.', 404);
    }

    return successResponse(res, 'Inquiry deleted successfully.');
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Export Inquiries to CSV
 */
export const exportInquiriesCsv = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    const headers = [
      'Reference Number',
      'Full Name',
      'Email',
      'Phone',
      'Company',
      'Service Required',
      'Estimated Budget',
      'Timeline',
      'Contact Method',
      'Status',
      'Priority',
      'Created Date',
    ];

    const rows = inquiries.map((inq) => [
      `"${inq.referenceNumber}"`,
      `"${inq.fullName.replace(/"/g, '""')}"`,
      `"${inq.email}"`,
      `"${(inq.phone || '').replace(/"/g, '""')}"`,
      `"${(inq.companyName || '').replace(/"/g, '""')}"`,
      `"${inq.serviceRequired.replace(/"/g, '""')}"`,
      `"${inq.estimatedBudget.replace(/"/g, '""')}"`,
      `"${inq.projectTimeline.replace(/"/g, '""')}"`,
      `"${inq.preferredContactMethod}"`,
      `"${inq.status}"`,
      `"${inq.priority}"`,
      `"${inq.createdAt.toISOString()}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=primeweb_inquiries_${Date.now()}.csv`);
    return res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
};

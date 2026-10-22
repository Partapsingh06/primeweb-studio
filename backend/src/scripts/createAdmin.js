import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import mongoose from 'mongoose';
import User from '../models/User.js';
import { connectDB, closeDB } from '../config/db.js';

const createAdmin = async () => {
  try {
    await connectDB();

    const email = process.env.ADMIN_INITIAL_EMAIL || process.argv[2];
    const password = process.env.ADMIN_INITIAL_PASSWORD || process.argv[3];
    const name = process.env.ADMIN_INITIAL_NAME || process.argv[4] || 'PrimeWeb Administrator';

    if (!email || !password) {
      console.error('======================================================');
      console.error('Error: Admin email and password must be provided.');
      console.error('Usage 1 (via ENV): Set ADMIN_INITIAL_EMAIL & ADMIN_INITIAL_PASSWORD in backend/.env');
      console.error('Usage 2 (CLI args): node src/scripts/createAdmin.js <email> <password> [name]');
      console.error('======================================================');
      process.exit(1);
    }

    if (password.length < 8) {
      console.error('Error: Admin password must be at least 8 characters long.');
      process.exit(1);
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      if (existingUser.role === 'admin') {
        console.log(`[Admin Setup] Admin account for ${email} already exists.`);
        process.exit(0);
      } else {
        existingUser.role = 'admin';
        await existingUser.save();
        console.log(`[Admin Setup] Existing account for ${email} promoted to admin.`);
        process.exit(0);
      }
    }

    await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: 'admin',
      status: 'active',
    });

    console.log('======================================================');
    console.log(`[Admin Setup] Initial administrator created successfully!`);
    console.log(`Email: ${email}`);
    console.log(`Role:  admin`);
    console.log('======================================================');
  } catch (error) {
    console.error('[Admin Setup] Failed to create admin:', error.message);
  } finally {
    await closeDB();
    process.exit(0);
  }
};

createAdmin();

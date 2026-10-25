import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import dns from 'node:dns';
try {
  dns.setServers(['1.1.1.1', '8.8.8.8']);
} catch {
  // Ignore
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import mongoose from 'mongoose';
import User from '../models/User.js';
import { connectDB, closeDB } from '../config/db.js';

const createAdmin = async () => {
  try {
    await connectDB();

    const rawEmail = process.argv.find((a) => a.includes('@')) || process.env.ADMIN_INITIAL_EMAIL || process.argv[2];
    const password = process.env.ADMIN_INITIAL_PASSWORD || (process.argv[2] && !process.argv[2].includes('@') ? process.argv[2] : process.argv[3]);
    const name = process.env.ADMIN_INITIAL_NAME || (process.argv[4] && !process.argv[4].startsWith('--') ? process.argv[4] : 'PrimeWeb Administrator');

    const email = rawEmail ? rawEmail.trim().toLowerCase() : '';
    const isReset =
      process.argv.includes('--reset') ||
      process.argv.includes('--force') ||
      process.argv.includes('--update-password') ||
      process.env.ADMIN_RESET_PASSWORD === 'true' ||
      process.env.ADMIN_FORCE_PASSWORD_RESET === 'true';

    if (!email || !password) {
      console.error('======================================================');
      console.error('Error: Admin email and password must be provided.');
      console.error('Usage 1 (via ENV): Set ADMIN_INITIAL_EMAIL & ADMIN_INITIAL_PASSWORD in backend/.env');
      console.error('Usage 2 (CLI args): node src/scripts/createAdmin.js <email> <password> [name] [--reset]');
      console.error('======================================================');
      process.exit(1);
    }

    if (password.length < 8) {
      console.error('Error: Admin password must be at least 8 characters long.');
      process.exit(1);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (isReset) {
        existingUser.password = password;
        existingUser.role = 'admin';
        existingUser.status = 'active';
        if (name) existingUser.name = name.trim();
        await existingUser.save();
        console.log('======================================================');
        console.log(`[Admin Setup] Admin password updated successfully!`);
        console.log(`Email: ${email}`);
        console.log(`Role:  admin`);
        console.log('======================================================');
        process.exit(0);
      }

      if (existingUser.role === 'admin') {
        console.log(`[Admin Setup] Admin account for ${email} already exists.`);
        console.log(`Note: To reset the password for this admin, run with --reset:`);
        console.log(`      node src/scripts/createAdmin.js ${email} <newPassword> --reset`);
        console.log(`      OR run: npm run reset:admin`);
        process.exit(0);
      } else {
        existingUser.role = 'admin';
        existingUser.status = 'active';
        await existingUser.save();
        console.log(`[Admin Setup] Existing account for ${email} promoted to admin.`);
        process.exit(0);
      }
    }

    await User.create({
      name: name.trim(),
      email,
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

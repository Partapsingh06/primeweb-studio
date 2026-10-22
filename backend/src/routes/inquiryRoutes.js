import express from 'express';
import {
  createInquiry,
  getMyInquiries,
  getMyInquiryById,
  getAllInquiriesAdmin,
  updateInquiryAdmin,
  deleteInquiryAdmin,
  exportInquiriesCsv,
} from '../controllers/inquiryController.js';
import { authenticate, authorize, optionalAuth } from '../middleware/auth.js';
import { inquiryLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public: Submit inquiry / quote
router.post('/', inquiryLimiter, optionalAuth, createInquiry);

// Client dashboard: Own inquiries
router.get('/my', authenticate, getMyInquiries);
router.get('/my/:id', authenticate, getMyInquiryById);

// Admin: Lead management & CSV export
router.get('/admin/export', authenticate, authorize('admin'), exportInquiriesCsv);
router.get('/admin/all', authenticate, authorize('admin'), getAllInquiriesAdmin);
router.put('/admin/:id', authenticate, authorize('admin'), updateInquiryAdmin);
router.delete('/admin/:id', authenticate, authorize('admin'), deleteInquiryAdmin);

export default router;

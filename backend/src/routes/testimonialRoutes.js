import express from 'express';
import {
  getTestimonials,
  getAllTestimonialsAdmin,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTestimonials);

router.get('/admin/all', authenticate, authorize('admin'), getAllTestimonialsAdmin);
router.post('/', authenticate, authorize('admin'), createTestimonial);
router.put('/:id', authenticate, authorize('admin'), updateTestimonial);
router.delete('/:id', authenticate, authorize('admin'), deleteTestimonial);

export default router;

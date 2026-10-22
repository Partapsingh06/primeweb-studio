import express from 'express';
import {
  getServices,
  getServiceBySlug,
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getServices);
router.get('/:slug', getServiceBySlug);

router.get('/admin/all', authenticate, authorize('admin'), getAllServicesAdmin);
router.post('/', authenticate, authorize('admin'), createService);
router.put('/:id', authenticate, authorize('admin'), updateService);
router.delete('/:id', authenticate, authorize('admin'), deleteService);

export default router;

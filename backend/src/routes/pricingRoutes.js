import express from 'express';
import {
  getPricingPackages,
  getAllPricingAdmin,
  createPricingPackage,
  updatePricingPackage,
  deletePricingPackage,
} from '../controllers/pricingController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPricingPackages);

router.get('/admin/all', authenticate, authorize('admin'), getAllPricingAdmin);
router.post('/', authenticate, authorize('admin'), createPricingPackage);
router.put('/:id', authenticate, authorize('admin'), updatePricingPackage);
router.delete('/:id', authenticate, authorize('admin'), deletePricingPackage);

export default router;

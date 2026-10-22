import express from 'express';
import { getDashboardStats } from '../controllers/statsController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', authenticate, authorize('admin'), getDashboardStats);

export default router;

import express from 'express';
import { getSiteSettings, updateSiteSettings } from '../controllers/settingsController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSiteSettings);
router.put('/', authenticate, authorize('admin'), updateSiteSettings);

export default router;

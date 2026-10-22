import express from 'express';
import { getCEOProfile, updateCEOProfile, uploadCEOPhoto } from '../controllers/ceoController.js';
import { upload } from '../config/multer.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCEOProfile);
router.put('/', authenticate, authorize('admin'), updateCEOProfile);
router.post('/photo', authenticate, authorize('admin'), upload.single('image'), uploadCEOPhoto);

export default router;


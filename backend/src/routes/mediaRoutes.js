import express from 'express';
import { uploadMedia, listMedia, deleteMedia } from '../controllers/mediaController.js';
import { upload } from '../config/multer.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Upload image (requires admin or client avatar upload)
router.post('/upload', authenticate, upload.single('image'), uploadMedia);

// Admin media library
router.get('/', authenticate, authorize('admin'), listMedia);
router.delete('/:filename', authenticate, authorize('admin'), deleteMedia);

export default router;

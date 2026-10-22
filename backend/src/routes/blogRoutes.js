import express from 'express';
import {
  getBlogPosts,
  getBlogPostBySlug,
  getAllBlogPostsAdmin,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from '../controllers/blogController.js';
import { authenticate, authorize, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getBlogPosts);
router.get('/:slug', optionalAuth, getBlogPostBySlug);

router.get('/admin/all', authenticate, authorize('admin'), getAllBlogPostsAdmin);
router.post('/', authenticate, authorize('admin'), createBlogPost);
router.put('/:id', authenticate, authorize('admin'), updateBlogPost);
router.delete('/:id', authenticate, authorize('admin'), deleteBlogPost);

export default router;

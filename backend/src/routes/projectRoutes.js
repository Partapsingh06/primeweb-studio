import express from 'express';
import {
  getProjects,
  getProjectBySlug,
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { authenticate, authorize, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Admin routes
router.get('/admin/all', authenticate, authorize('admin'), getAllProjectsAdmin);
router.post('/', authenticate, authorize('admin'), createProject);
router.put('/:id', authenticate, authorize('admin'), updateProject);
router.delete('/:id', authenticate, authorize('admin'), deleteProject);

// Public routes
router.get('/', getProjects);
router.get('/:slug', optionalAuth, getProjectBySlug);

export default router;

import express from 'express';
import {
  getClientsAdmin,
  getClientDetailsAdmin,
  toggleClientStatusAdmin,
} from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/clients', authenticate, authorize('admin'), getClientsAdmin);
router.get('/clients/:id', authenticate, authorize('admin'), getClientDetailsAdmin);
router.put('/clients/:id/status', authenticate, authorize('admin'), toggleClientStatusAdmin);

export default router;

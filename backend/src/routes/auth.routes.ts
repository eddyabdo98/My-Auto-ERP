import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { checkAuth } from '../middleware/auth.middleware';

const router = Router();

// Login route
router.post('/login', AuthController.login);

// Change password route (requires authentication)
router.post('/change-password', checkAuth, AuthController.changePassword);

export default router;
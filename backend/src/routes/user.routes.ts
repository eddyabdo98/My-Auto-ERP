import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { checkAuth, checkRole } from '../middleware/auth.middleware';
import { UserRole } from '../models/User';

const router = Router();

// Get all users
router.get('/', [checkAuth, checkRole([UserRole.ADMIN, UserRole.MANAGER])], UserController.listAll);

// Get one user
router.get(
  '/:id',
  [checkAuth, checkRole([UserRole.ADMIN, UserRole.MANAGER])],
  UserController.getOneById
);

// Create a new user
router.post('/', [checkAuth, checkRole([UserRole.ADMIN])], UserController.newUser);

// Edit one user
router.put('/:id', [checkAuth, checkRole([UserRole.ADMIN])], UserController.editUser);

// Delete one user
router.delete('/:id', [checkAuth, checkRole([UserRole.ADMIN])], UserController.deleteUser);

export default router;
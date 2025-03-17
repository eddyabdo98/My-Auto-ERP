import { Router } from 'express';
import { AppDataSource } from '../config/database';
import { User, UserRole } from '../models/user.model';
import { hash } from 'bcrypt';
import { authenticateToken } from '../middleware/auth';
import { checkRole } from '../middleware/roles';

const router = Router();
const userRepository = AppDataSource.getRepository(User);

// Get all users (Admin only)
router.get('/', authenticateToken, checkRole([UserRole.ADMIN]), async (req, res) => {
  try {
    const users = await userRepository.find({
      select: ['id', 'username', 'email', 'role', 'isActive', 'createdAt', 'updatedAt']
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new user (Admin only)
router.post('/', authenticateToken, checkRole([UserRole.ADMIN]), async (req, res) => {
  try {
    const { username, password, email, role } = req.body;

    const existingUser = await userRepository.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await hash(password, 10);
    const user = userRepository.create({
      username,
      password: hashedPassword,
      email,
      role
    });

    await userRepository.save(user);
    
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user (Admin only)
router.put('/:id', authenticateToken, checkRole([UserRole.ADMIN]), async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role, isActive } = req.body;

    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username !== user.username) {
      const existingUser = await userRepository.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      user.username = username;
    }

    user.email = email;
    user.role = role;
    user.isActive = isActive;

    await userRepository.save(user);
    
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete user (Admin only)
router.delete('/:id', authenticateToken, checkRole([UserRole.ADMIN]), async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await userRepository.remove(user);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
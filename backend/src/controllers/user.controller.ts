import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User, UserRole } from '../models/User';
import { checkRole } from '../middleware/auth.middleware';

export class UserController {
  static listAll = async (req: Request, res: Response): Promise<Response> => {
    const userRepository = getRepository(User);
    try {
      const users = await userRepository.find({
        select: ['id', 'username', 'fullName', 'role', 'isActive', 'createdAt'],
      });
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching users' });
    }
  };

  static getOneById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const userRepository = getRepository(User);

    try {
      const user = await userRepository.findOneOrFail({ where: { id } });
      return res.json(user);
    } catch (error) {
      return res.status(404).json({ message: 'User not found' });
    }
  };

  static newUser = async (req: Request, res: Response): Promise<Response> => {
    const { username, password, fullName, role } = req.body;
    const userRepository = getRepository(User);

    // Check if username already exists
    const existingUser = await userRepository.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const user = new User();
    user.username = username;
    user.password = password;
    user.fullName = fullName;
    user.role = role;

    try {
      await userRepository.save(user);
      return res.status(201).json({
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating user' });
    }
  };

  static editUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { fullName, password, role, isActive } = req.body;
    const userRepository = getRepository(User);

    try {
      const user = await userRepository.findOneOrFail({ where: { id } });

      // Only admin can change roles
      if (role && req.user.role !== UserRole.ADMIN) {
        return res.status(403).json({ message: 'Only admins can change user roles' });
      }

      // Update user properties
      if (fullName) user.fullName = fullName;
      if (password) user.password = password;
      if (role) user.role = role;
      if (typeof isActive === 'boolean') user.isActive = isActive;

      await userRepository.save(user);

      return res.json({
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
        isActive: user.isActive,
      });
    } catch (error) {
      return res.status(404).json({ message: 'User not found' });
    }
  };

  static deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const userRepository = getRepository(User);

    try {
      const user = await userRepository.findOneOrFail({ where: { id } });

      // Prevent deleting the last admin
      if (user.role === UserRole.ADMIN) {
        const adminCount = await userRepository.count({ where: { role: UserRole.ADMIN } });
        if (adminCount <= 1) {
          return res.status(400).json({ message: 'Cannot delete the last admin user' });
        }
      }

      await userRepository.remove(user);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ message: 'User not found' });
    }
  };
}
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export class AuthController {
  static login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail({ where: { username } });
      if (!user.isActive) {
        return res.status(401).json({ message: 'User account is deactivated' });
      }

      const validPassword = await user.validatePassword(password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      );

      return res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          role: user.role
        }
      });
    } catch (error) {
      return res.status(401).json({ message: 'Invalid username' });
    }
  };

  static changePassword = async (req: Request, res: Response): Promise<Response> => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!(oldPassword && newPassword)) {
      return res.status(400).json({ message: 'Old password and new password are required' });
    }

    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail({ where: { id: userId } });
      const validPassword = await user.validatePassword(oldPassword);

      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid old password' });
      }

      user.password = newPassword;
      await userRepository.save(user);

      return res.json({ message: 'Password changed successfully' });
    } catch (error) {
      return res.status(400).json({ message: 'Could not change password' });
    }
  };
}
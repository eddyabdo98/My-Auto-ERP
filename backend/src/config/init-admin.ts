import { AppDataSource } from './database';
import { User, UserRole } from '../models/user.model';
import { hash } from 'bcrypt';

export const initializeAdmin = async () => {
  const userRepository = AppDataSource.getRepository(User);

  try {
    // Check if admin user already exists
    const adminExists = await userRepository.findOne({
      where: { username: 'admin' }
    });

    if (!adminExists) {
      // Create admin user
      const hashedPassword = await hash('admin123', 10);
      const adminUser = userRepository.create({
        username: 'admin',
        password: hashedPassword,
        email: 'admin@myautoerp.com',
        role: UserRole.ADMIN,
        isActive: true
      });

      await userRepository.save(adminUser);
      console.log('Admin user created successfully');
    }
  } catch (error) {
    console.error('Error initializing admin user:', error);
  }
};
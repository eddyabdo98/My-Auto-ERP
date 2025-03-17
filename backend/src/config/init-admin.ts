import { getRepository } from 'typeorm';
import { User, UserRole } from '../models/User';

export const initializeAdmin = async () => {
  const userRepository = getRepository(User);

  try {
    // Check if admin user exists
    const adminExists = await userRepository.findOne({
      where: { username: 'admin' }
    });

    if (!adminExists) {
      // Create admin user
      const admin = new User();
      admin.username = 'admin';
      admin.password = 'admin123';
      admin.fullName = 'System Administrator';
      admin.role = UserRole.ADMIN;
      admin.isActive = true;

      await userRepository.save(admin);
      console.log('Admin user created successfully');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};
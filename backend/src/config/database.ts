import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from '../models/user.model';

// Load environment variables
config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'my_auto_erp',
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [User],
  subscribers: [],
  migrations: [],
});
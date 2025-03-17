import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import itemRoutes from './routes/item.routes';
import clientRoutes from './routes/client.routes';
import purchaseRoutes from './routes/purchase.routes';
import salesRoutes from './routes/sales.routes';
import cashRoutes from './routes/cash.routes';
import expenseRoutes from './routes/expense.routes';
import supplierRoutes from './routes/supplier.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 12345;

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:12346',
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/cash', cashRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/suppliers', supplierRoutes);

// Database connection
createConnection()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

export default app;
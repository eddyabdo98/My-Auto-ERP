import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/inventory/Products';
import Categories from './pages/inventory/Categories';
import PurchaseOrders from './pages/purchase/PurchaseOrders';
import Suppliers from './pages/purchase/Suppliers';
import SalesOrders from './pages/sales/SalesOrders';
import Customers from './pages/sales/Customers';
import Invoices from './pages/accounting/Invoices';
import Payments from './pages/accounting/Payments';
import { useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      // Inventory routes
      {
        path: '/inventory/products',
        element: <Products />,
      },
      {
        path: '/inventory/categories',
        element: <Categories />,
      },
      // Purchase routes
      {
        path: '/purchase/orders',
        element: <PurchaseOrders />,
      },
      {
        path: '/purchase/suppliers',
        element: <Suppliers />,
      },
      // Sales routes
      {
        path: '/sales/orders',
        element: <SalesOrders />,
      },
      {
        path: '/sales/customers',
        element: <Customers />,
      },
      // Accounting routes
      {
        path: '/accounting/invoices',
        element: <Invoices />,
      },
      {
        path: '/accounting/payments',
        element: <Payments />,
      },
    ],
  },
]);
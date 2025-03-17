import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Login from './pages/Login';
import Layout from './components/Layout';
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

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="inventory/products" element={<Products />} />
          <Route path="inventory/categories" element={<Categories />} />
          <Route path="purchase/orders" element={<PurchaseOrders />} />
          <Route path="purchase/suppliers" element={<Suppliers />} />
          <Route path="sales/orders" element={<SalesOrders />} />
          <Route path="sales/customers" element={<Customers />} />
          <Route path="accounting/invoices" element={<Invoices />} />
          <Route path="accounting/payments" element={<Payments />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
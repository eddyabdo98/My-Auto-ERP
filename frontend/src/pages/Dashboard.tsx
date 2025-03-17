import { Box, Grid, Paper, Typography } from '@mui/material';
import {
  ShoppingCart as OrdersIcon,
  Inventory as ProductsIcon,
  People as CustomersIcon,
  AccountBalance as RevenueIcon,
} from '@mui/icons-material';

export default function Dashboard() {
  // Sample data - replace with actual data from your backend
  const dashboardData = {
    totalOrders: 150,
    totalProducts: 75,
    totalCustomers: 45,
    totalRevenue: 25000,
  };

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4">
          {typeof value === 'number' && title.includes('Revenue')
            ? `$${value.toLocaleString()}`
            : value.toLocaleString()}
        </Typography>
      </Box>
      <Icon sx={{ fontSize: 40, color }} />
    </Paper>
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value={dashboardData.totalOrders}
            icon={OrdersIcon}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Products"
            value={dashboardData.totalProducts}
            icon={ProductsIcon}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Customers"
            value={dashboardData.totalCustomers}
            icon={CustomersIcon}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value={dashboardData.totalRevenue}
            icon={RevenueIcon}
            color="#9c27b0"
          />
        </Grid>
      </Grid>

      {/* Add more dashboard content here */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Welcome to My Auto ERP
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Use the sidebar menu to navigate through different modules:
        </Typography>
        <ul>
          <li>Manage your inventory and products</li>
          <li>Track purchase orders and suppliers</li>
          <li>Handle sales orders and customer information</li>
          <li>Monitor invoices and payments</li>
        </ul>
      </Box>
    </Box>
  );
}
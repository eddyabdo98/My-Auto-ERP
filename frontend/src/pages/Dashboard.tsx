import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import {
  People as PeopleIcon,
  Inventory as InventoryIcon,
  ShoppingCart as PurchaseIcon,
  LocalShipping as SalesIcon,
} from '@mui/icons-material';
import Layout from '../components/Layout';

export default function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Users',
      value: '25',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      path: '/users',
    },
    {
      title: 'Inventory Items',
      value: '150',
      icon: <InventoryIcon sx={{ fontSize: 40 }} />,
      path: '/inventory',
    },
    {
      title: 'Purchase Orders',
      value: '12',
      icon: <PurchaseIcon sx={{ fontSize: 40 }} />,
      path: '/purchase',
    },
    {
      title: 'Sales Orders',
      value: '45',
      icon: <SalesIcon sx={{ fontSize: 40 }} />,
      path: '/sales',
    },
  ];

  const quickActions = [
    {
      title: 'Create Purchase Order',
      description: 'Create a new purchase order for inventory items',
      path: '/purchase/new',
    },
    {
      title: 'Create Sales Order',
      description: 'Create a new sales order for customers',
      path: '/sales/new',
    },
    {
      title: 'Add Inventory Item',
      description: 'Add a new item to inventory',
      path: '/inventory/new',
    },
    {
      title: 'Add User',
      description: 'Add a new user to the system',
      path: '/users/new',
    },
  ];

  return (
    <Layout>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard Overview
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
                onClick={() => navigate(stat.path)}
              >
                {stat.icon}
                <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                  {stat.value}
                </Typography>
                <Typography color="text.secondary">{stat.title}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Quick Actions */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={3}>
          {quickActions.map((action) => (
            <Grid item xs={12} sm={6} md={3} key={action.title}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {action.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {action.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => navigate(action.path)}
                  >
                    Get Started
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* System Status */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          System Status
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body1" color="success.main" gutterBottom>
            • System is running normally
          </Typography>
          <Typography variant="body1" gutterBottom>
            • Last backup: Today at {new Date().toLocaleTimeString()}
          </Typography>
          <Typography variant="body1">
            • Active users: 3
          </Typography>
        </Paper>
      </Box>
    </Layout>
  );
}
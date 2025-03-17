import React, { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
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
  const [openDialog, setOpenDialog] = useState('');

  const stats = [
    {
      title: 'Total Users',
      value: '5',
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      path: '/users',
    },
    {
      title: 'Inventory Items',
      value: '24',
      icon: <InventoryIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      path: '/inventory',
    },
    {
      title: 'Purchase Orders',
      value: '8',
      icon: <PurchaseIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
      path: '/purchase',
    },
    {
      title: 'Sales Orders',
      value: '15',
      icon: <SalesIcon sx={{ fontSize: 40, color: 'info.main' }} />,
      path: '/sales',
    },
  ];

  const quickActions = [
    {
      title: 'Create Purchase Order',
      description: 'Create a new purchase order for inventory items',
      path: '/purchase/new',
      color: 'warning.main',
      dialog: 'purchase',
    },
    {
      title: 'Create Sales Order',
      description: 'Create a new sales order for customers',
      path: '/sales/new',
      color: 'info.main',
      dialog: 'sales',
    },
    {
      title: 'Add Inventory Item',
      description: 'Add a new item to inventory',
      path: '/inventory/new',
      color: 'success.main',
      dialog: 'inventory',
    },
    {
      title: 'Add User',
      description: 'Add a new user to the system',
      path: '/users/new',
      color: 'primary.main',
      dialog: 'user',
    },
  ];

  const handleOpenDialog = (dialogType: string) => {
    setOpenDialog(dialogType);
  };

  const handleCloseDialog = () => {
    setOpenDialog('');
  };

  const handleSubmit = (type: string) => {
    // TODO: Implement actual submission
    console.log(`Creating new ${type}`);
    handleCloseDialog();
    // Navigate to the corresponding page
    navigate(`/${type}s`);
  };

  const renderDialog = () => {
    switch (openDialog) {
      case 'inventory':
        return (
          <Dialog open onClose={handleCloseDialog}>
            <DialogTitle>Add New Inventory Item</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Item Name"
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                label="Category"
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                label="Quantity"
                type="number"
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                label="Price"
                type="number"
                fullWidth
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={() => handleSubmit('inventory')} variant="contained">
                Add Item
              </Button>
            </DialogActions>
          </Dialog>
        );

      case 'purchase':
        return (
          <Dialog open onClose={handleCloseDialog}>
            <DialogTitle>Create Purchase Order</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Supplier"
                fullWidth
                variant="outlined"
              />
              <TextField
                select
                margin="dense"
                label="Status"
                fullWidth
                variant="outlined"
                defaultValue="pending"
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="processing">Processing</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </TextField>
              <TextField
                margin="dense"
                label="Total Amount"
                type="number"
                fullWidth
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={() => handleSubmit('purchase')} variant="contained">
                Create Order
              </Button>
            </DialogActions>
          </Dialog>
        );

      case 'sales':
        return (
          <Dialog open onClose={handleCloseDialog}>
            <DialogTitle>Create Sales Order</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Customer"
                fullWidth
                variant="outlined"
              />
              <TextField
                select
                margin="dense"
                label="Status"
                fullWidth
                variant="outlined"
                defaultValue="pending"
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="processing">Processing</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </TextField>
              <TextField
                margin="dense"
                label="Total Amount"
                type="number"
                fullWidth
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={() => handleSubmit('sales')} variant="contained">
                Create Order
              </Button>
            </DialogActions>
          </Dialog>
        );

      case 'user':
        return (
          <Dialog open onClose={handleCloseDialog}>
            <DialogTitle>Add New User</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Username"
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
              />
              <TextField
                select
                margin="dense"
                label="Role"
                fullWidth
                variant="outlined"
                defaultValue="user"
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={() => handleSubmit('user')} variant="contained">
                Add User
              </Button>
            </DialogActions>
          </Dialog>
        );

      default:
        return null;
    }
  };

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
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
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
              <Card
                sx={{
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ color: action.color }}>
                    {action.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {action.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => handleOpenDialog(action.dialog)}
                    sx={{ color: action.color }}
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
            • Last backup: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
          </Typography>
          <Typography variant="body1">
            • Active users: 3
          </Typography>
        </Paper>

        {/* Dialogs */}
        {renderDialog()}
      </Box>
    </Layout>
  );
}
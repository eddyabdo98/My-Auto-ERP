import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import Layout from '../components/Layout';

export default function Inventory() {
  // Placeholder data
  const items = [
    { id: 1, name: 'Item 1', category: 'Category A', quantity: 'Loading...', price: 'Loading...' },
    { id: 2, name: 'Item 2', category: 'Category B', quantity: 'Loading...', price: 'Loading...' },
    { id: 3, name: 'Item 3', category: 'Category A', quantity: 'Loading...', price: 'Loading...' },
  ];

  return (
    <Layout>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Inventory Management</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {/* TODO: Implement add item */}}
          >
            Add New Item
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell>
                    <Button size="small" color="primary">Edit</Button>
                    <Button size="small" color="error">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  );
}
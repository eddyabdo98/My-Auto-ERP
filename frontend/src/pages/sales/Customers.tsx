import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Email as EmailIcon, Phone as PhoneIcon } from '@mui/icons-material';

export default function Customers() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Customer 1',
      email: 'customer1@example.com',
      phone: '+1234567890',
      address: '123 Customer St, City',
      status: 'Active',
      totalOrders: 5,
    },
    {
      id: 2,
      name: 'Customer 2',
      email: 'customer2@example.com',
      phone: '+0987654321',
      address: '456 Client Ave, Town',
      status: 'Inactive',
      totalOrders: 3,
    },
  ]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Customers</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {/* TODO: Implement add customer */}}
        >
          Add Customer
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Total Orders</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon fontSize="small" />
                      {customer.email}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon fontSize="small" />
                      {customer.phone}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.totalOrders}</TableCell>
                <TableCell>
                  <Chip
                    label={customer.status}
                    color={customer.status === 'Active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => {/* TODO: Implement edit */}}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => {/* TODO: Implement delete */}}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
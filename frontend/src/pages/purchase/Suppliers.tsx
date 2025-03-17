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

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: 'Supplier 1',
      email: 'supplier1@example.com',
      phone: '+1234567890',
      address: '123 Supplier St, City',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Supplier 2',
      email: 'supplier2@example.com',
      phone: '+0987654321',
      address: '456 Vendor Ave, Town',
      status: 'Inactive',
    },
  ]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Suppliers</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {/* TODO: Implement add supplier */}}
        >
          Add Supplier
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
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.id}</TableCell>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon fontSize="small" />
                      {supplier.email}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon fontSize="small" />
                      {supplier.phone}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{supplier.address}</TableCell>
                <TableCell>
                  <Chip
                    label={supplier.status}
                    color={supplier.status === 'Active' ? 'success' : 'default'}
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
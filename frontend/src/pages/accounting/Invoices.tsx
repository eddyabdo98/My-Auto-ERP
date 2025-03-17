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
import { Add as AddIcon, Visibility as ViewIcon, Print as PrintIcon } from '@mui/icons-material';

export default function Invoices() {
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-001',
      date: '2024-03-17',
      customer: 'Customer 1',
      amount: 2000,
      dueDate: '2024-04-17',
      status: 'Unpaid',
      type: 'Sales',
    },
    {
      id: 'INV-002',
      date: '2024-03-16',
      customer: 'Supplier 1',
      amount: 1500,
      dueDate: '2024-04-16',
      status: 'Paid',
      type: 'Purchase',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'success';
      case 'unpaid':
        return 'error';
      case 'overdue':
        return 'error';
      case 'partial':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'sales':
        return 'primary';
      case 'purchase':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Invoices</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {/* TODO: Implement add invoice */}}
        >
          New Invoice
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice #</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer/Supplier</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>
                  <Chip
                    label={invoice.type}
                    color={getTypeColor(invoice.type) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={invoice.status}
                    color={getStatusColor(invoice.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => {/* TODO: Implement view */}}>
                    <ViewIcon />
                  </IconButton>
                  <IconButton onClick={() => {/* TODO: Implement print */}}>
                    <PrintIcon />
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
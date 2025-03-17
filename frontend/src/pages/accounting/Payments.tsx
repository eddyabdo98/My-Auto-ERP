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
import { Add as AddIcon, Visibility as ViewIcon, Receipt as ReceiptIcon } from '@mui/icons-material';

export default function Payments() {
  const [payments, setPayments] = useState([
    {
      id: 'PAY-001',
      date: '2024-03-17',
      reference: 'INV-001',
      party: 'Customer 1',
      amount: 2000,
      method: 'Credit Card',
      type: 'Received',
      status: 'Completed',
    },
    {
      id: 'PAY-002',
      date: '2024-03-16',
      reference: 'INV-002',
      party: 'Supplier 1',
      amount: 1500,
      method: 'Bank Transfer',
      type: 'Sent',
      status: 'Pending',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'received':
        return 'success';
      case 'sent':
        return 'primary';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Payments</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {/* TODO: Implement add payment */}}
        >
          Record Payment
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Payment ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Reference</TableCell>
              <TableCell>Customer/Supplier</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.reference}</TableCell>
                <TableCell>{payment.party}</TableCell>
                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>
                  <Chip
                    label={payment.type}
                    color={getTypeColor(payment.type) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={payment.status}
                    color={getStatusColor(payment.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => {/* TODO: Implement view */}}>
                    <ViewIcon />
                  </IconButton>
                  <IconButton onClick={() => {/* TODO: Implement receipt */}}>
                    <ReceiptIcon />
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
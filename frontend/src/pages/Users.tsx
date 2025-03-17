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
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

export default function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2024-03-17 10:30',
    },
    {
      id: 2,
      username: 'manager',
      email: 'manager@example.com',
      role: 'Manager',
      status: 'Active',
      lastLogin: '2024-03-16 15:45',
    },
  ]);

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'error';
      case 'manager':
        return 'warning';
      case 'user':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Users</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {/* TODO: Implement add user */}}
        >
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    label={user.role}
                    color={getRoleColor(user.role) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    color={getStatusColor(user.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>{user.lastLogin}</TableCell>
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
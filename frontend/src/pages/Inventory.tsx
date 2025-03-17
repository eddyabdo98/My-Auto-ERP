import React, { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import Layout from '../components/Layout';

export default function Inventory() {
  const [openDialog, setOpenDialog] = useState(false);
  const [items, setItems] = useState([
    { id: 1, name: 'Engine Oil', category: 'Oils', quantity: '50', price: '$25.99' },
    { id: 2, name: 'Brake Pads', category: 'Brakes', quantity: '30', price: '$45.99' },
    { id: 3, name: 'Air Filter', category: 'Filters', quantity: '25', price: '$15.99' },
  ]);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    quantity: '',
    price: '',
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewItem({ name: '', category: '', quantity: '', price: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddItem = () => {
    // Add validation here
    const newId = Math.max(...items.map(item => item.id)) + 1;
    const formattedPrice = newItem.price.startsWith('$') ? newItem.price : `$${newItem.price}`;
    
    setItems((prev) => [
      ...prev,
      {
        id: newId,
        name: newItem.name,
        category: newItem.category,
        quantity: newItem.quantity,
        price: formattedPrice,
      },
    ]);
    
    handleCloseDialog();
  };

  const handleDeleteItem = (id: number) => {
    setItems((prev) => prev.filter(item => item.id !== id));
  };

  return (
    <Layout>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Inventory Management</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
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
                    <IconButton color="primary" size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add Item Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Add New Inventory Item</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Item Name"
              fullWidth
              variant="outlined"
              value={newItem.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="category"
              label="Category"
              fullWidth
              variant="outlined"
              value={newItem.category}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="quantity"
              label="Quantity"
              type="number"
              fullWidth
              variant="outlined"
              value={newItem.quantity}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="price"
              label="Price"
              fullWidth
              variant="outlined"
              value={newItem.price}
              onChange={handleInputChange}
              placeholder="e.g., 29.99"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleAddItem} variant="contained">
              Add Item
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
}
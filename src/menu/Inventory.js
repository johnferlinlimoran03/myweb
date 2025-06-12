import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Button, Stack, TextField, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';

const initialInventory = [
  { id: 1, name: 'Dell Laptop XPS 15', location: 'Warehouse A', stock: 20, expiry: '2026-12-01' },
  { id: 2, name: 'Office Chair', location: 'Warehouse B', stock: 50, expiry: '2026-12-01' },
  { id: 3, name: 'Whiteboard', location: 'Warehouse C', stock: 30, expiry: '2025-09-15' },
  { id: 4, name: 'Monitor Stand', location: 'Warehouse A', stock: 15, expiry: '—' },
  { id: 5, name: 'Mechanical Keyboard', location: 'Warehouse B', stock: 25, expiry: '2027-05-10' }
];

function Inventory() {
  const [inventory, setInventory] = useState(initialInventory);
  const [filter, setFilter] = useState('');
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [zoomRatio, setZoomRatio] = useState(window.devicePixelRatio);

  useEffect(() => {
    const handleResize = () => {
      setZoomRatio(window.devicePixelRatio);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let containerMaxWidth;
  if (zoomRatio < 1.0) {
    containerMaxWidth = 'xl';
  } else if (zoomRatio >= 1.0 && zoomRatio <= 1.2) {
    containerMaxWidth = 'lg';
  } else if (zoomRatio > 1.2 && zoomRatio <= 1.5) {
    containerMaxWidth = 'md';
  } else {
    containerMaxWidth = 'sm';
  }

  const handleEdit = (item) => {
    setEditingItem(item);
    setOpen(true);
  };

  const handleSave = () => {
    setInventory((prev) =>
      prev.map((i) => (i.id === editingItem.id ? editingItem : i))
    );
    setOpen(false);
    setEditingItem(null);
  };

  return (
    <Container maxWidth={containerMaxWidth} sx={{ paddingX: zoomRatio > 1.2 ? 1 : 2, mt: 4 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Inventory Management</Typography>

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <TextField
            label="Search by Item or Location"
            variant="outlined"
            size="small"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            fullWidth
          />
        </Stack>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Stock Level</TableCell>
                <TableCell>Stock Expiry Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.filter((i) =>
                i.name.toLowerCase().includes(filter.toLowerCase()) || 
                i.location.toLowerCase().includes(filter.toLowerCase())
              ).map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.stock.toLocaleString('en-PH')}</TableCell>
                  <TableCell>{item.expiry !== '—' ? item.expiry : 'N/A'}</TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined" onClick={() => handleEdit(item)}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>Edit Inventory Item</DialogTitle>
          <DialogContent>
            {editingItem && (
              <Stack spacing={2} sx={{ mt: 1 }}>
                <TextField
                  label="Item Name"
                  name="name"
                  fullWidth
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  required
                />
                <TextField
                  label="Stock Level"
                  name="stock"
                  type="number"
                  fullWidth
                  value={editingItem.stock}
                  onChange={(e) => setEditingItem({ ...editingItem, stock: parseInt(e.target.value) })}
                  required
                />
                <TextField
                  label="Stock Expiry Date"
                  name="expiry"
                  type="date"
                  fullWidth
                  value={editingItem.expiry}
                  onChange={(e) => setEditingItem({ ...editingItem, expiry: e.target.value })}
                />
              </Stack>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">Save Changes</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
}

export default Inventory;
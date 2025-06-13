import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem
} from '@mui/material';

const initialItems = [
  { id: 1, name: 'Dell Laptop XPS 15', sku: 'DLXPS15', category: 'Electronics', price: 50000, available: true },
  { id: 2, name: 'Office Chair', sku: 'OCH123', category: 'Furniture', price: 3000, available: true },
  { id: 3, name: 'Whiteboard', sku: 'WB456', category: 'Office Supplies', price: 3000, available: false },
  { id: 4, name: 'Monitor Stand', sku: 'MS789', category: 'Accessories', price: 2000, available: true },
  { id: 5, name: 'Mechanical Keyboard', sku: 'MK101', category: 'Electronics', price: 5500, available: true },
  { id: 6, name: 'Envelopes (Legal Size)', sku: 'ENV-LG', category: 'Stationery', price: 100, available: false },
  { id: 7, name: 'Desktop PC', sku: 'DPC999', category: 'Electronics', price: 40000, available: true },
  { id: 8, name: 'Projector Screen', sku: 'PS555', category: 'Accessories', price: 20000, available: true },
  { id: 9, name: 'Wireless Mouse', sku: 'WM888', category: 'Electronics', price: 1500, available: true },
  { id: 10, name: 'Standing Desk', sku: 'SD700', category: 'Furniture', price: 3500, available: false }
];

function Items() {
  const [items, setItems] = useState(initialItems);
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
    setItems((prev) => prev.map((i) => (i.id === editingItem.id ? editingItem : i)));
    setOpen(false);
    setEditingItem(null);
  };

  const handleToggleAvailability = (itemId) => {
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, available: !i.available } : i))
    );
  };

  return (
    <Container maxWidth={containerMaxWidth} sx={{ paddingX: zoomRatio > 1.2 ? 1 : 2, mt: 4 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Item Catalog</Typography>

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <TextField
            label="Search by SKU or Category"
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
                <TableCell>SKU</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price (PHP)</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.filter((i) =>
                i.sku.toLowerCase().includes(filter.toLowerCase()) ||
                i.category.toLowerCase().includes(filter.toLowerCase())
              ).map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{`₱${item.price.toLocaleString('en-PH')}`}</TableCell>
                  <TableCell>{item.available ? 'Available' : 'Out of Stock'}</TableCell>
                  <TableCell>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={1}
                      alignItems="flex-start"
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        fullWidth
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        fullWidth
                        color={item.available ? 'error' : 'success'}
                        onClick={() => handleToggleAvailability(item.id)}
                      >
                        {item.available ? 'Disable' : 'Enable'}
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>Edit Item</DialogTitle>
          <DialogContent>
            {editingItem && (
              <Stack spacing={2} sx={{ mt: 1 }}>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  required
                />
                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  fullWidth
                  value={editingItem.price}

                  onChange={(e) =>
                    setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })
                  }

                  required
                />
                <TextField
                  select
                  name="category"
                  label="Category"
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  fullWidth
                >
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Furniture">Furniture</MenuItem>
                  <MenuItem value="Office Supplies">Office Supplies</MenuItem>
                  <MenuItem value="Accessories">Accessories</MenuItem>
                </TextField>
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

export default Items;
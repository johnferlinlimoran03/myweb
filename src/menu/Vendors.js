import React, { useState , useEffect} from 'react';
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
      MenuItem,
} from '@mui/material';

const initialVendors = [
  { id: 'V-001', name: 'Tech Supplies Inc.', contact: 'tech@supplies.com', status: 'Active' },
  { id: 'V-002', name: 'OfficeHub', contact: 'info@officehub.ph', status: 'Inactive' }
];

function Vendors() {
  const [zoomRatio, setZoomRatio] = useState(window.devicePixelRatio);

useEffect(() => {
    const handleResize = () => {
        setZoomRatio(window.devicePixelRatio);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
}, []);
const generateVendorID = () => `V-${String(vendors.length + 1).padStart(3, '0')}`;
  const [vendors, setVendors] = useState(initialVendors);
  const [filter, setFilter] = useState('');
  const [open, setOpen] = useState(false);
  const [newVendor, setNewVendor] = useState({ id: '', name: '', contact: '', status: 'Active' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVendor((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setVendors((prev) => [...prev, { ...newVendor, id: generateVendorID() }]);
    setNewVendor({ name: '', contact: '', status: 'Active' });
    setOpen(false);
};


  const filteredVendors = vendors.filter((v) =>
    v.name.toLowerCase().includes(filter.toLowerCase())
  );
      let containerMaxWidth;
    if (zoomRatio < 1.0) {
        containerMaxWidth = 'xl';
    } else if (zoomRatio >= 1.0 && zoomRatio <= 1.1) {
        containerMaxWidth = 'lg';
    } else if (zoomRatio > 1.1 && zoomRatio <= 1.2) {
        containerMaxWidth = 'lg';
    } else if (zoomRatio > 1.2 && zoomRatio <= 1.5) {
        containerMaxWidth = 'md';
    } else {
        containerMaxWidth = 'sm'; // Optional: Handles extreme zoom levels
    }

    const containerPaddingX = zoomRatio > 1.2 ? 1 : 2;

  return (
    <Container maxWidth={containerMaxWidth}  sx={{ paddingX: zoomRatio > 1.2 ? 1 : 2 }}>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Vendors
        </Typography>

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <TextField
            label="Search Vendors"
            variant="outlined"
            size="small"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={() => setOpen(true)} sx={{ ml: 2 }}>
            Add Vendor
          </Button>
        </Stack>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Vendor ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>{vendor.id}</TableCell>
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.contact}</TableCell>
                  <TableCell>{vendor.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>Add New Vendor</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField label="Vendor ID" name="id" fullWidth value={newVendor.id} onChange={handleChange} required />
              <TextField label="Name" name="name" fullWidth value={newVendor.name} onChange={handleChange} required />
              <TextField label="Contact" name="contact" fullWidth value={newVendor.contact} onChange={handleChange} required />
              <TextField
                select
                name="status"
                label="Status"
                value={newVendor.status}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleSubmit} variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
}

export default Vendors;
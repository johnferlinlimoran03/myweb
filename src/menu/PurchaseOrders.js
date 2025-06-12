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
    TextField,
    MenuItem,
    Button,
    Stack
} from '@mui/material';

const samplePOs = [
  {
    id: 'PO-001',
    supplier: 'Dell Technologies',
    item: 'Dell Laptop XPS 15',
    quantity: 3,
    status: 'Created',
    orderDate: '2024-06-10',
    deliveryDate: '2024-06-20'
  },
  {
    id: 'PO-002',
    supplier: 'Office Depot',
    item: 'Office Chairs',
    quantity: 10,
    status: 'Delivered',
    orderDate: '2024-06-01',
    deliveryDate: '2024-06-10'
  },
  {
    id: 'PO-003',
    supplier: 'Stationery World',
    item: 'Envelopes (Legal Size)',
    quantity: 500,
    status: 'Partially Delivered',
    orderDate: '2024-06-05',
    deliveryDate: '2024-06-12'
  },
  {
    id: 'PO-004',
    supplier: 'Tech Solutions Inc.',
    item: 'Desktop PC',
    quantity: 5,
    status: 'Sent',
    orderDate: '2024-06-07',
    deliveryDate: 'TBD'
  },
  {
    id: 'PO-005',
    supplier: 'Office Depot',
    item: 'Whiteboard',
    quantity: 2,
    status: 'Rejected',
    orderDate: '2024-06-03',
    deliveryDate: 'N/A'
  },
  {
    id: 'PO-006',
    supplier: 'SupplyPro',
    item: 'Ethernet Cables',
    quantity: 50,
    status: 'Confirmed',
    orderDate: '2024-06-08',
    deliveryDate: 'TBD'
  },
  {
    id: 'PO-007',
    supplier: 'LogiTech Solutions',
    item: 'Monitors (24")',
    quantity: 8,
    status: 'Processing',
    orderDate: '2024-06-09',
    deliveryDate: 'TBD'
  },
  {
    id: 'PO-008',
    supplier: 'Creative Supplies Co.',
    item: 'Printer Ink',
    quantity: 12,
    status: 'Completed',
    orderDate: '2024-06-02',
    deliveryDate: '2024-06-11'
  },
  {
    id: 'PO-009',
    supplier: 'Warehouse Depot',
    item: 'Filing Cabinets',
    quantity: 4,
    status: 'Cancelled',
    orderDate: '2024-06-06',
    deliveryDate: '—'
  }
];
const suppliers = ['Dell Technologies', 'Office Depot', 'Stationery World'];
const items = ['Dell Laptop XPS 15', 'Office Chairs', 'Envelopes (Legal Size)'];

function PurchaseOrders() {
    const [zoomRatio, setZoomRatio] = useState(window.devicePixelRatio);
    const [purchaseOrders, setPurchaseOrders] = useState(samplePOs);
    const [newPO, setNewPO] = useState({
        supplier: '',
        item: '',
        quantity: '',
        status: 'Issued',
        orderDate: ''
    });

    const [filter, setFilter] = useState('');

    useEffect(() => {
        const handleResize = () => setZoomRatio(window.devicePixelRatio);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getNextId = () => `PO-${String(purchaseOrders.length + 1).padStart(3, '0')}`;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPO((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreatePO = (e) => {
        e.preventDefault();
        const newEntry = {
            ...newPO,
            id: getNextId(),
            orderDate: new Date().toISOString().slice(0, 10),
            deliveryDate: 'TBD'
        };
        setPurchaseOrders((prev) => [...prev, newEntry]);
        setNewPO({ supplier: '', item: '', quantity: '', status: 'Issued', orderDate: '' });
    };

    const filteredPOs = purchaseOrders.filter(
        (po) =>
            po.id.toLowerCase().includes(filter.toLowerCase()) ||
            po.status.toLowerCase().includes(filter.toLowerCase())
    );
    const getStatusColor = (status) => {
        switch (status) {
            case 'Created':
                return 'blue';
            case 'Sent':
                return '#0288d1'; // light blue
            case 'Confirmed':
                return '#6a1b9a'; // purple
            case 'Processing':
            case 'In Progress':
                return '#ff9800'; // orange
            case 'Delivered':
                return 'green';
            case 'Partially Delivered':
                return '#fbc02d'; // yellow-ish
            case 'Completed':
                return 'teal';
            case 'Cancelled':
                return 'gray';
            case 'Rejected':
                return 'red';
            default:
                return 'black';
        }
    };
    const statusSequence = [
        'Created',
        'Sent',
        'Confirmed',
        'Processing',
        'Partially Delivered',
        'Delivered',
        'Completed'
        // Note: 'Rejected' and 'Cancelled' are terminal and do not follow this sequence
    ];

    const getPreviousStatus = (status) => {
        const index = statusSequence.indexOf(status);
        return index > 0 ? statusSequence[index - 1] : null;
    };

    const getNextStatus = (status) => {
        const index = statusSequence.indexOf(status);
        return index >= 0 && index < statusSequence.length - 1
            ? statusSequence[index + 1]
            : null;
    };

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
        <Container maxWidth={containerMaxWidth} sx={{ paddingX: containerPaddingX }}>
            <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Purchase Orders
                </Typography>

                {/* PO Creation Form */}
                <form onSubmit={handleCreatePO} style={{ marginBottom: 24 }}>
                    <Typography variant="h6" gutterBottom>Generate New PO</Typography>
                    <Stack spacing={2}>
                        {/* Row: Supplier & Item */}
                        <Stack direction="row" spacing={2}>
                            <TextField
                                select
                                label="Supplier"
                                name="supplier"
                                value={newPO.supplier}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            >
                                {suppliers.map((s) => (
                                    <MenuItem key={s} value={s}>{s}</MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                select
                                label="Item"
                                name="item"
                                value={newPO.item}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            >
                                {items.map((i) => (
                                    <MenuItem key={i} value={i}>{i}</MenuItem>
                                ))}
                            </TextField>
                        </Stack>

                        {/* Row: Quantity only */}
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="Quantity"
                                name="quantity"
                                type="number"
                                value={newPO.quantity}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                        </Stack>

                        {/* Submit Button on its own row */}
                        <Button type="submit" variant="contained" color="primary">
                            Create PO
                        </Button>
                    </Stack>
                </form>

                {/* Filter Input */}
                <TextField
                    label="Search"
                    placeholder="Search by ID or Status"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />

                {/* PO Table */}
                <TableContainer>
                    <Table size="small" sx={{ width: zoomRatio > 1.2 ? '150%' : '100%' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>PO ID</TableCell>
                                <TableCell>Supplier</TableCell>
                                <TableCell>Item</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Previous Step</TableCell>
                                <TableCell>Next Step</TableCell>
                                <TableCell>Order Date</TableCell>
                                <TableCell>Delivery Date</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filteredPOs.map((po) => (
                                <TableRow key={po.id}>
                                    <TableCell>{po.id}</TableCell>
                                    <TableCell>{po.supplier}</TableCell>
                                    <TableCell>{po.item}</TableCell>
                                    <TableCell>{po.quantity}</TableCell>
                                    <TableCell sx={{ color: getStatusColor(po.status), fontWeight: 'bold' }}>
                                        {po.status}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 500, color: '#777' }}>
                                        {getPreviousStatus(po.status) || '—'}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 500, color: '#777' }}>
                                        {getNextStatus(po.status) || '—'}
                                    </TableCell>


                                    <TableCell>{po.orderDate}</TableCell>
                                    <TableCell>{po.deliveryDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
}

export default PurchaseOrders;
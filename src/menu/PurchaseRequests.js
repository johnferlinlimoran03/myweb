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
    MenuItem
} from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
const departments = [
    'Engineering',
    'Finance',
    'Procurement',
    'Marketing',
    'HR'
];
const items = [
    'Dell Laptop XPS 15',
    'Office Chairs',
    'Envelopes (Legal Size)',
    'Whiteboard',
    'Desktop PC'
];

const sampleRequests = [
    {
        id: 'PR-001',
        department: 'Engineering',
        item: 'Dell Laptop XPS 15',
        quantity: 3,
        status: 'Pending',
        date: '2024-06-01'
    },
    {
        id: 'PR-002',
        department: 'Finance',
        item: 'Office Chairs',
        quantity: 10,
        status: 'Approved',
        date: '2024-05-28'
    },
    {
        id: 'PR-003',
        department: 'Procurement',
        item: 'Envelopes (Legal Size)',
        quantity: 500,
        status: 'Rejected',
        date: '2024-05-20'
    }
];

function PurchaseRequests() {
    //BASIC
        console.log("BASIC")
    //copy an array
    const original = [1,2,3];
    const copy = [...original];
    console.log("copy an array")
    console.log(copy);
    //combine array
    const a= [1,2];
    const b = [3,4];
    const combined = [...a, ...b];
    console.log("combine arrays")
    console.log(combined);
    //pass aray elements as functions arguments
    const nums = [5,10,15];
    console.log("pass aray elements as functions arguments")
   console.log(Math.max(...nums));
    const [zoomRatio, setZoomRatio] = useState(window.devicePixelRatio);
     console.log("INTERMEDIATE LEVEL")
     //clone an object
     const user = {name: 'John', role: 'dev'};
     const clone = {...user};
     console.log("clone an object");
     console.log(clone);
     //- Merge objects
    const base = {status: 'pending'};
    const update = {status: 'approved', date: '2025-06-13'};
    const merged = {...base,...update};
    console.log("merged object");
    console.log(merged);
    // Override properties
    const config = { theme: 'light', zoom: 1 };
    const newConfig = { ...config, zoom: 2 };
  console.log("Override properties");
    console.log(newConfig);
    console.log("ADVANCE LEVEL")
    //immutable updates in nested objects
    const state = {
        request: {id :1, status: 'draft'},
        user: {name: 'John'}
    };
    const updated = {
        ...state,
        request: {...state.request,     status: ' submited'}
    }
    console.log("immutable updates in nested objects");
    console.log(updated);
    // const [stateupdate, setStateupdate] = useState(sampleRequests);
    // //Use in React state updates
    // setStateupdate(prev=>[...prev,{...newRequest,date:new Date().toISOString().slice(0,10)}])
    //      console.log("Use in React state updates");
    // console.log(stateupdate);
    console.log("Conditional spreading");
   const isAdmin = true;
    const user2 = {
  name: 'John',
  ...(isAdmin && { role: 'admin' })
    };
    console.log(user2);


    useEffect(() => {
        const handleResize = () => {
            setZoomRatio(window.devicePixelRatio);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);


    // Adjust containerMaxWidth based on zoom level
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

    // Function to determine font color based on status
    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'orange'; // Yellow is too light, so using orange for better visibility
            case 'Approved':
                return 'green';
            case 'Rejected':
                return 'red';
            default:
                return 'black';
        }
    };
    const [newRequest, setNewRequest] = useState({
        id: '',
        department: '',
        item: '',
        quantity: '',
        status: 'Pending',
        date: ''
    });
    const [requests, setRequests] = useState(sampleRequests);
    const [filter, setFilter] = useState('');
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRequest((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setRequests((prev) => [...prev, { ...newRequest, date: new Date().toISOString().slice(0, 10) }]);
        setNewRequest({ id: '', department: '', item: '', quantity: '', status: 'Pending', date: '' });
    };
    const filteredRequests = requests.filter(
        (req) =>
            req.id.toLowerCase().includes(filter.toLowerCase()) ||
            req.status.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <Container maxWidth={containerMaxWidth} sx={{ paddingX: containerPaddingX }}>
            <Paper elevation={3} sx={{ padding: 2, marginTop: 4, overflow: 'auto' }}>
                <Typography variant="h5" gutterBottom>
                    Purchase Requests
                </Typography>
                <Stack spacing={2}>
                    {/* Row: Request ID & Department */}



                    {/* Submit Button */}
                    <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                        Create Purchase Request
                    </Button>

                    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                        <DialogTitle>Create New Purchase Request</DialogTitle>
                        <DialogContent dividers>
                            <form id="create-request-form" onSubmit={handleSubmit}>
                                <Stack spacing={2} sx={{ mt: 1 }}>
                                    <Stack direction="row" spacing={2}>
                                        <TextField
                                            label="Request ID"
                                            name="id"
                                            value={newRequest.id}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                        />
                                        <TextField
                                            select
                                            label="Department"
                                            name="department"
                                            value={newRequest.department}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                        >
                                            {departments.map((dept) => (
                                                <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                                            ))}
                                        </TextField>
                                    </Stack>

                                    <Stack direction="row" spacing={2}>
                                        <TextField
                                            select
                                            label="Item"
                                            name="item"
                                            value={newRequest.item}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                        >
                                            {items.map((itemName) => (
                                                <MenuItem key={itemName} value={itemName}>{itemName}</MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                            label="Quantity"
                                            name="quantity"
                                            type="number"
                                            value={newRequest.quantity}
                                            onChange={handleInputChange}
                                            fullWidth
                                            required
                                        />
                                    </Stack>
                                </Stack>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Cancel</Button>
                            <Button type="submit" form="create-request-form" variant="contained">Submit</Button>
                        </DialogActions>
                    </Dialog>

                </Stack>



                <TextField
                    label="Search"
                    placeholder="Search by ID or Status"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    sx={{ marginBottom: 2, marginTop: 2 }}
                />

                <TableContainer sx={{ overflowX: 'auto' }}>
                    <Table
                        size="small"
                        sx={{
                            width: zoomRatio > 1.2 ? '150%' : '100%',
                            tableLayout: 'auto'
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>Request ID</TableCell>
                                <TableCell>Department</TableCell>
                                <TableCell>Item</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Date Requested</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sampleRequests.map((req) => (
                                <TableRow key={req.id}>
                                    <TableCell>{req.id}</TableCell>
                                    <TableCell>{req.department}</TableCell>
                                    <TableCell>{req.item}</TableCell>
                                    <TableCell>{req.quantity}</TableCell>
                                    <TableCell sx={{ color: getStatusColor(req.status), fontWeight: 'bold' }}>
                                        {req.status}
                                    </TableCell>
                                    <TableCell>{req.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
}

export default PurchaseRequests;
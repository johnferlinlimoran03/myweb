import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Stack, TextField } from '@mui/material';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const reportData = [
  { id: 'PR-001', vendor: 'Tech Supplies Inc.', item: 'Dell Laptop XPS 15', totalAmount: 150000, status: 'Completed' },
  { id: 'PR-002', vendor: 'OfficeHub', item: 'Office Chair', totalAmount: 30000, status: 'Pending' },
  { id: 'PR-003', vendor: 'Stationery Pro', item: 'Whiteboard', totalAmount: 5000, status: 'Cancelled' }
];

function Reports() {
  const [filter, setFilter] = useState('');
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

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report Summary");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(data, "PurchaseReport.xlsx");
  };

  return (
    <Container maxWidth={containerMaxWidth} sx={{ paddingX: zoomRatio > 1.2 ? 1 : 2, mt: 4 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Purchase Activity Reports</Typography>

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <TextField
            label="Search by Vendor or Status"
            variant="outlined"
            size="small"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleExport} sx={{ ml: 2 }}>
            Download XLSX
          </Button>
        </Stack>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Request ID</TableCell>
                <TableCell>Vendor</TableCell>
                <TableCell>Item</TableCell>
                <TableCell>Total Amount (₱)</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData.filter((r) =>
                r.vendor.toLowerCase().includes(filter.toLowerCase()) ||
                r.status.toLowerCase().includes(filter.toLowerCase())
              ).map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.id}</TableCell>
                  <TableCell>{report.vendor}</TableCell>
                  <TableCell>{report.item}</TableCell>
                  <TableCell>{report.totalAmount.toLocaleString('en-PH')}</TableCell>
                  <TableCell>{report.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

export default Reports;
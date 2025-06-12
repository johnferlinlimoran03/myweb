import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

function Reports() {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Reports
        </Typography>
        <Typography variant="body1">
          Download and analyze summaries of purchase activity, vendor performance, and inventory status. You can expand this page with filters, export options, and charts.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Reports;

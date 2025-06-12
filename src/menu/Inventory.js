import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

function Inventory() {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Inventory
        </Typography>
        <Typography variant="body1">
          Track stock levels, location-wise breakdowns, and inbound/outbound item movements. This will power real-time inventory visibility.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Inventory;

import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

function Items() {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Item Master
        </Typography>
        <Typography variant="body1">
          View and organize item specs, pricing, and categories. Perfect for catalog management, SKU editing, and availability flags.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Items;

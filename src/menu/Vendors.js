import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

function Vendors() {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Vendors / Suppliers
        </Typography>
        <Typography variant="body1">
          Manage vendor details, company info, and contact records. This is the hub for onboarding and maintaining supplier profiles.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Vendors;

import { useEffect, useState } from "react";
import { Container, Paper, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import landingImage from "../assets/images/iris.png"; // Import image
function IRIS() {
  const navigate = useNavigate();
  const [zoomRatio, setZoomRatio] = useState(window.devicePixelRatio);

  useEffect(() => {
    const handleResize = () => setZoomRatio(window.devicePixelRatio);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let containerMaxWidth;
  if (zoomRatio < 1.0) {
    containerMaxWidth = "xl";
  } else if (zoomRatio >= 1.0 && zoomRatio <= 1.2) {
    containerMaxWidth = "lg";
  } else if (zoomRatio > 1.2 && zoomRatio <= 1.5) {
    containerMaxWidth = "md";
  } else {
    containerMaxWidth = "sm";
  }

  const containerPaddingX = zoomRatio > 1.2 ? 1 : 2;

  return (
    <Container maxWidth={containerMaxWidth} sx={{ paddingX: containerPaddingX, textAlign: "center", marginTop: 4 }}>
      <Paper elevation={4} sx={{ padding: 4, backgroundColor: "#81b1ce", color: "#fff" }}>
          <img
          src={landingImage}
          alt="Agent Remittance System"
          style={{ width: "40%", height: "40%", borderRadius: "8px", marginBottom: "16px" }}
        />
        <Typography variant="h4" gutterBottom>
          Welcome to IRIS - Integrated Regional Information System
        </Typography>
        <Typography variant="h6">
          A powerful system to streamline regional data and operational processes.
        </Typography>
        <Button
          variant="contained"
          sx={{ marginTop: 2, backgroundColor: "#151269", color: "#81b1ce" }}
          onClick={() => navigate("/dashboard")}
        >
          Get Started
        </Button>
      </Paper>

      {/* Features Section */}
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
    
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#81b1ce", color: "#fff" }}>
            <Typography variant="h6">🔍 Real-Time Insights</Typography>
            <Typography variant="body2">Access accurate and up-to-date analytics for decision-making.</Typography>
          </Paper>
        </Grid>
     
      </Grid>
    </Container>
  );
}

export default IRIS;
import { useEffect, useState } from "react";
import { Container, Paper, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

function WebPortal() {
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
      <Paper elevation={4} sx={{ padding: 4, backgroundColor: "#151269", color: "#fff" }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Web Portal
        </Typography>
        <Typography variant="h6">
          Your centralized hub for accessing remittance and financial services.
        </Typography>
        <Button
          variant="contained"
          sx={{ marginTop: 2, backgroundColor: "#81b1ce", color: "#151269" }}
          onClick={() => navigate("/dashboard")}
        >
          Get Started
        </Button>
      </Paper>

      {/* Upload Feature Label */}
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4, backgroundColor: "#81b1ce", color: "#151269" }}>
        <Typography variant="h6">📂 Upload Transaction Feature</Typography>
        <Typography variant="body2">
          This section allows users to upload transaction files for processing.
        </Typography>
      </Paper>

    </Container>
  );
}

export default WebPortal;
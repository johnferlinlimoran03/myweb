import { useEffect, useState } from "react";
import { Container, Paper, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import landingImage from "../assets/images/gfclogo.png"; // Import image
function GFC() {
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
            <img
          src={landingImage}
          alt="Agent Remittance System"
          style={{ width: "20%", height: "20%", borderRadius: "8px", marginBottom: "16px" }}
        />
        <Typography variant="h4" gutterBottom>
          Welcome to GFC - Global Filipino Card
        </Typography>
        <Typography variant="h6">
          Empowering Filipinos with secure, reliable, and global financial solutions.
        </Typography>
        <Button
          variant="contained"
          sx={{ marginTop: 2, backgroundColor: "#81b1ce", color: "#151269" }}
          onClick={() => navigate("/dashboard")}
        >
          Get Started
        </Button>
      </Paper>

      {/* Features Section */}
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
     
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 1, backgroundColor: "#151269", color: "#fff" }}>
            <Typography variant="h6">💳 Digital & Physical Card</Typography>
            <Typography variant="body2">Convenient payment solutions for everyday needs.</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 1, backgroundColor: "#81b1ce", color: "#151269" }}>
            <Typography variant="h6">🌍 Global Reach</Typography>
            <Typography variant="body2">Accepted worldwide for seamless transactions.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GFC;
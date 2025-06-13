import { useEffect, useState } from "react";
import { Container, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import landingImage from "../assets/images/arslogo.png"; // Import image


function ARS() {
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
    <Container maxWidth={containerMaxWidth} sx={{ paddingX: containerPaddingX }}>
      <Paper elevation={4} sx={{ padding: 4, textAlign: "center", backgroundColor: "#81b1ce", color: "#151269" }}>
         <img
          src={landingImage}
          alt="Agent Remittance System"
          style={{ width: "50%", height: "40%", borderRadius: "8px", marginBottom: "16px" }}
        />

        <Typography variant="h4" gutterBottom>
          Welcome to Agent Remittance System
        </Typography>
        <Typography variant="h6">Effortless & Secure Money Transfers</Typography>
        <Button
          variant="contained"
          sx={{ marginTop: 2, backgroundColor: "#151269", color: "#fff" }}
          onClick={() => navigate("/dashboard")}
        >
          Get Started
        </Button>
      </Paper>
    </Container>
  );
}

export default ARS;
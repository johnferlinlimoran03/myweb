import { useEffect, useState } from "react";
import { Container, Paper, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';
import SpeedIcon  from '@mui/icons-material/Speed';
import PublicIcon from '@mui/icons-material/Public';
function APAS() {
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
      <Paper elevation={4} sx={{ padding: 4, backgroundColor: "#FFA500", color: "#0033A0" }}>
        <Typography variant="h4" gutterBottom>
          Welcome to APAS - Advise and Pay System
        </Typography>
        <Typography variant="h6">Streamline your remittance and payment processes with efficiency and security.</Typography>
        <Button
          variant="contained"
          sx={{ marginTop: 2, backgroundColor: "#0033A0", color: "#fff" }}
          onClick={() => navigate("/dashboard")}
        >
          Get Started
        </Button>
      </Paper>

      {/* Features Section */}
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#0033A0", color: "#fff" }}>
              <LockIcon sx={{ verticalAlign: "middle", marginRight: 1 }} />

            <Typography variant="h6"> Secure Transactions</Typography>
            <Typography variant="body2">All payments are encrypted for maximum security.</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#FFA500", color: "#0033A0" }}>
                <SpeedIcon sx={{ verticalAlign: "middle", marginRight: 1 }} />

            <Typography variant="h6"> Fast Processing</Typography>
            <Typography variant="body2">Instant payment execution and confirmations.</Typography>
          </Paper>
        </Grid>
      
        
      </Grid>
    </Container>
  );
}

export default APAS;
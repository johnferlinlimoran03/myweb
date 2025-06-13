import { useEffect, useState } from "react";
import { Container, Paper, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import landingImage from "../assets/images/qrcode.png"; // Import image

const remittanceSystems = [
  { name: "ARS", path: "/ars" },
  { name: "GFC", path: "/gfc" },
  { name: "APAS", path: "/apas" },
  { name: "IRIS", path: "/iris" },
  { name: "Web Portal", path: "/webportal" }
];

function SingleSignOn() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Container maxWidth={containerMaxWidth} sx={{ paddingX: containerPaddingX, textAlign: "center", marginTop: 4 }}>
      <Paper elevation={4} sx={{ padding: 4, backgroundColor: "#81b1ce", color: "#151269" }}>
            <img
          src={landingImage}
          alt="QR"
          style={{ width: "50%", height: "40%", borderRadius: "8px", marginBottom: "16px" }}
        />
        <Typography variant="h4" gutterBottom>
          Welcome to Single Sign-On (SSO)
        </Typography>

        {!isAuthenticated ? (
          <Button
            variant="contained"
            sx={{ backgroundColor: "#151269", color: "#fff", marginTop: 2 }}
            onClick={handleLogin}
          >
            Login with SSO
          </Button>
        ) : (
          <Grid container spacing={2} sx={{ marginTop: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
            {remittanceSystems.map((system) => (
              <Grid item xs={12} sm={6} md={4} key={system.name} sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#151269", color: "#fff", width: "80%" }}
                  onClick={() => navigate(system.path)}
                >
                  {system.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
}

export default SingleSignOn;
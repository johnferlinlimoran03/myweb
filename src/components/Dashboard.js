import { useEffect, useState } from "react";
import { Container, Paper, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const initialSummary = [
  { category: "Purchase Requests", total: 5, details: { pending: 3, approved: 1, rejected: 1 } },
  { category: "Purchase Orders", total: 8, details: { sent: 4, delivered: 2, completed: 2 } },
  { category: "Vendors", total: 5, details: { active: 4, inactive: 1 } },
  { category: "Items", total: 15, details: { available: 10, outOfStock: 5 } },
  { category: "Inventory", total: 12, details: { inWarehouse: 8, inUse: 4 } }
];

function Dashboard() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const [summary, setSummary] = useState(initialSummary);
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
      <Paper elevation={4} sx={{ padding: 4, textAlign: "center", marginBottom: 4, backgroundColor: "#81b1ce" }}>
        <Typography variant="h4" sx={{ color: "#151269" }} gutterBottom>
          Welcome, {user || "Guest"}!
        </Typography>
        <Typography variant="h6" gutterBottom>Neltex Purchasing Dashboard</Typography>
        <Button
          variant="contained"
          sx={{ marginTop: 2, color: "#fff", backgroundColor: "#151269" }}
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/logout");
          }}
        >
          Logout
        </Button>
      </Paper>

      {/* Summary Cards - Loop through array */}
      <Grid container spacing={2}>
        {summary.map(({ category, total, details }) => (
          <Grid item xs={12} sm={6} md={4} key={category}>
            <Card sx={{ backgroundColor: "#151269", color: "#fff" }}>
              <CardContent>
                <Typography variant="h6">{category}</Typography>
                <Typography variant="body1">Total: {total}</Typography>
                {Object.entries(details).map(([key, value]) => (
                  <Typography variant="body2" key={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard;
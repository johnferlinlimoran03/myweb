import { useEffect } from "react";
import { Container, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  // Uncomment to redirect if user session is missing
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/logout");
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={4} sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h4"  sx={{ color: '#FFA000' }}  gutterBottom>
          Welcome, {user || "Guest"}!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Neltext Purchasing Dashboard
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}

          sx={{ marginTop: 3,color: '#fff' ,  backgroundColor: '#0D47A1' }}
        >
          Logout
        </Button>
      </Paper>
    </Container>
  );
}

export default Dashboard;

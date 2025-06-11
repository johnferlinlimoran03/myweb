import { useEffect } from "react";
import { Container, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const user = localStorage.getItem("user");

    useEffect(() => {
        // Redirect to login if no user session found
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user"); // Clear session
        navigate("/"); // Redirect to login page
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={4} sx={{ padding: 4, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                    Welcome, {user}!
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Employee Management Dashboard
                </Typography>

                <Button variant="contained" color="primary" sx={{ margin: 2 }} onClick={() => navigate("/employees")}>
                    View Employees
                </Button>
                <Button variant="contained" color="error" sx={{ margin: 2 }} onClick={handleLogout}>
                    Logout
                </Button>
            </Paper>
        </Container>
    );
}

export default Dashboard;

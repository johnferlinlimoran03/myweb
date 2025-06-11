import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";

function NavigationBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("user"); // Clear session
        navigate("/"); // Redirect to login
    };

    return (
        <AppBar position="static">
            {localStorage.getItem("user") && (
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Employee Management
                    </Typography>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/dashboard"
                        sx={{ fontWeight: location.pathname === "/dashboard" ? "bold" : "normal" }}
                    >
                        Dashboard
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/employees"
                        sx={{ fontWeight: location.pathname === "/employees" ? "bold" : "normal" }}
                    >
                        Employees
                    </Button>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            )}
        </AppBar>
    );
}

export default NavigationBar;

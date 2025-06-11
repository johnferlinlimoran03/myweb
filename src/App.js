import { HashRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeList from "./menu/EmployeeList";
import NavigationBar from "./components/NavigationBar";
// import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
    return (
        <Router>
            <NavigationBar />
            <Routes>
                {/* <Route path="/" element={<Login />} /> */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/employees" element={<EmployeeList />} />
            </Routes>
        </Router>
    );
}

export default App;

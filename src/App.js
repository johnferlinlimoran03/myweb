import { HashRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";

// All routes now point to components inside the `menu` folder
import Dashboard from "./components/Dashboard";
import PurchaseRequests from "./menu/PurchaseRequests";
import PurchaseOrders from "./menu/PurchaseOrders";
import Vendors from "./menu/Vendors";
import Items from "./menu/Items";
import Inventory from "./menu/Inventory";
import Reports from "./menu/Reports";


function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/requests" element={<PurchaseRequests />} />
        <Route path="/orders" element={<PurchaseOrders />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/items" element={<Items />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/reports" element={<Reports />} />

      </Routes>
    </Router>
  );
}

export default App;

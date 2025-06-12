import { useEffect, useState } from "react";
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Box, TableSortLabel, Stack } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, FormControl, FormHelperText, InputLabel } from "@mui/material";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
// import EmployeeService from "./../api/fetchEmployees";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { padding } from "@mui/system";

function EmployeeList() {
    const navigate = useNavigate();

    const [openalert, setopenalert] = useState(false);
    const [getreturn, setgetreturn] = useState("");
    const [severity, setSeverity] = useState("info");
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [employeesview, setEmployeesview] = useState([]);
    const [filteredEmployeesview, setFilteredEmployeesview] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [newEmployee, setNewEmployee] = useState({ lastName: "", firstName: "", Address: "", Email: "", PhoneNumber: "", DeptId: "", RoleId: "" });
    const [editingEmployee, setEditingEmployee] = useState(null);
    //load departments
    const [departments, setDepartments] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedDept, setSelectedDept] = useState(1);
    const [selectedRole, setSelectedRole] = useState(1);
    // useEffect(() => {
    //     if (!localStorage.getItem("user")) {
    //         navigate("/Employees");
    //     } else {
    //         loadEmployees();
    //         loaddepartment();
    //         loadrole();
    //     }
    // }, [navigate]);
    const loadrole = async (ID) => {

        // const data = await EmployeeService.fetchRole();

        // setRoles(data);
    };
    const loaddepartment = async (ID) => {

        // const data = await EmployeeService.fetchDepartment();

        // setDepartments(data);

    };
    const loadEmployeesview = async (ID) => {

        // const data = await EmployeeService.fetchEmployees(ID);
        // console.log(data)
        // setEmployeesview(data);
        // setFilteredEmployeesview(data);
    };
    const loadEmployees = async () => {

        // const data = await EmployeeService.fetchEmployees();
        // setEmployees(data);
        // setFilteredEmployees(data);
    };

    const handleSort = (field) => {
        const newOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
        setSortField(field);
        setSortOrder(newOrder);

        setFilteredEmployees([...filteredEmployees].sort((a, b) => {
            return typeof a[field] === "string"
                ? newOrder === "asc"
                    ? a[field].localeCompare(b[field])
                    : b[field].localeCompare(a[field])
                : newOrder === "asc"
                    ? a[field] - b[field]
                    : b[field] - a[field];
        }));
    };
    const [openDialog, setOpenDialog] = useState(false);
    const handleAddEmployee = () => {
        setEditingEmployee(null);
        console.log(newEmployee)
        // setNewEmployee(newEmployee);

        setSelectedDept(newEmployee.deptId)
        setSelectedRole(newEmployee.roleId);
        setOpenDialog(true); // Open the dialog
    };
    const handleEditEmployee = (employee) => {
        setNewEmployee({ ...newEmployee }); // Ensures newEmployee remains an object
        setEditingEmployee(employee);

        console.log(employee.roleid);
        setSelectedDept(employee.deptId);
        setSelectedRole(employee.roleId);
        setOpenDialog(true);
    };
    const [openDialogview, setOpenDialogview] = useState(false);
    const handleViewEmployee = (ID) => {
        loadEmployeesview(ID);
        setOpenDialogview(true); // Open the dialog
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleCloseDialogview = () => {
        setOpenDialogview(false);
    };
    const handleDeleteEmployee = async (id) => {
        // await EmployeeService.deleteEmployee(id);
        loadEmployees();
    };

    const handleAddOrEditEmployee = async () => {
        console.log(newEmployee)
        console.log(editingEmployee)
        handleCloseDialog();
        if (editingEmployee) {
            // const editdata = await EmployeeService.updateEmployee(editingEmployee.id, editingEmployee);
            // if (editdata.message) {

            //     setSeverity(editdata.status === "success" ? "success" : "error");
            //     setgetreturn(editdata.message);
            // }
            // else {
            //     setgetreturn(editdata);
            //     setSeverity(editdata.status === "success" ? "success" : "error");
            // }


        } else {
            // const adddata = await EmployeeService.addEmployee(newEmployee);
            // console.log(adddata);
            // if (adddata.message) {
            //     console.log(adddata.status);


            //     setSeverity(adddata.status === "success" ? "success" : "error");
            //     setgetreturn(adddata.message);
            // }
            // else {
            //     setgetreturn(adddata);
            //     setSeverity(adddata.status === "success" ? "success" : "error");
            // }

        }

        setopenalert(true); // Show success alert
        setEditingEmployee(null);
        setNewEmployee({ LastName: "", FirstName: "", Address: "", Email: "", PhoneNumber: "", DeptId: "", RoleId: "" });
        loadEmployees();
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredEmployees(
            employees.filter(emp =>
                emp.lastname.toLowerCase().includes(query) || emp.address.toLowerCase().includes(query)
            )
        );
    };

    // **Export employees as an Excel file**
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(employees);

        // Apply wrap text only to cells that contain data
        Object.keys(worksheet).forEach((cell) => {
            if (cell[0] !== "!" && worksheet[cell].v) { // Check if cell contains a value
                worksheet[cell].s = {
                    alignment: { wrapText: true }, // Enable text wrapping
                };
            }
        });

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
        XLSX.writeFile(workbook, "EmployeeData.xlsx");
    };

    return (
        <Container maxWidth="lg">
            <Paper elevation={4} sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Employee Management
                </Typography>

                {/* Search Bar */}
                <TextField
                    label="Search Employees"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={handleSearch}
                    sx={{ marginBottom: 3 }}
                />

                {/* Add/Edit Employee Form */}
                <Box sx={{ marginBottom: 3, display: "flex", gap: 2 }}>
                    {/* <TextField
                        label="Last Name"
                        variant="outlined"
                        value={newEmployee.lastname}
                        onChange={(e) => editingEmployee ? setEditingEmployee({ ...editingEmployee, lastname: e.target.value }) : setNewEmployee({ ...newEmployee, lastname: e.target.value })}
                    />
                    <TextField
                        label="First Name"
                        variant="outlined"
                        value={newEmployee.firstname}
                        onChange={(e) => editingEmployee ? setEditingEmployee({ ...editingEmployee, firstname: e.target.value }) : setNewEmployee({ ...newEmployee, firstname: e.target.value })}
                    />
                    <TextField
                        label="Address"
                        variant="outlined"
                        value={newEmployee.address}
                        onChange={(e) => editingEmployee ? setEditingEmployee({ ...editingEmployee, address: e.target.value }) : setNewEmployee({ ...newEmployee, address: e.target.value })}
                    />
                    <TextField
                        label="Email Address"
                        variant="outlined"
                        value={newEmployee.email}
                        onChange={(e) => editingEmployee ? setEditingEmployee({ ...editingEmployee, email: e.target.value }) : setNewEmployee({ ...newEmployee, email: e.target.value })}
                    /> */}

                    <Button variant="contained" color="primary" onClick={handleAddEmployee}>
                        Add Employee
                    </Button>
                </Box>

                {/* Export Button */}
                <Button variant="contained" color="success" sx={{ marginBottom: 3 }} onClick={exportToExcel}>
                    Export as Excel
                </Button>

                {/* Employee Table */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortField === "id"}
                                        direction={sortField === "id" ? sortOrder : "asc"}
                                        onClick={() => handleSort("id")}
                                    >
                                        <strong>ID</strong>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortField === "lastname"}
                                        direction={sortField === "lastname" ? sortOrder : "asc"}
                                        onClick={() => handleSort("lastname")}
                                    >
                                        <strong>Last Name</strong>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortField === "firstname"}
                                        direction={sortField === "firstname" ? sortOrder : "asc"}
                                        onClick={() => handleSort("firstname")}
                                    >
                                        <strong>First Name</strong>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortField === "address"}
                                        direction={sortField === "address" ? sortOrder : "asc"}
                                        onClick={() => handleSort("address")}
                                    >
                                        <strong>Address</strong>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ textAlign: "center" }} align="center"><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredEmployees.map(emp => (
                                <TableRow key={emp.id}>
                                    <TableCell>{emp.id}</TableCell>
                                    <TableCell>{emp.lastName}</TableCell>
                                    <TableCell>{emp.firstName}</TableCell>
                                    <TableCell>{emp.address}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }} align="center">
                                        <Button onClick={() => handleEditEmployee(emp)} color="primary" sx={{ marginRight: 1 }}>Edit</Button>
                                        <Button onClick={() => handleDeleteEmployee(emp.id)} color="error">Delete</Button>
                                        <Button onClick={() => handleViewEmployee(emp.id)} color="success">View</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>Edit Employee</DialogTitle>
                <DialogContent>
                    <Stack>
                        <Stack sx={{ pt: 3 }} direction="row">
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                value={editingEmployee?.lastName || newEmployee.lastName}

                                onChange={(e) => editingEmployee ? setEditingEmployee({ ...editingEmployee, lastName: e.target.value })
                                    : setNewEmployee({ ...newEmployee, lastName: e.target.value })}
                                sx={{ marginBottom: 2, mx: 1 }}
                            />
                            <TextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                value={editingEmployee?.firstName || newEmployee.firstName}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    console.log(value);

                                    if (editingEmployee) {
                                        setEditingEmployee({ ...editingEmployee, firstName: value }); // Ensure property name matches
                                        console.log("edit" + editingEmployee.firstName);
                                    } else {
                                        setNewEmployee({ ...newEmployee, firstName: value }); // Ensure property name matches
                                        console.log("new" + newEmployee.firstName);
                                    }
                                }}
                                sx={{ marginBottom: 2, mx: 1 }}
                            />

                            <TextField
                                label="Address"
                                variant="outlined"
                                fullWidth
                                value={editingEmployee?.address || newEmployee.address}
                                onChange={(e) => editingEmployee ? setEditingEmployee({ ...editingEmployee, address: e.target.value })
                                    : setNewEmployee({ ...newEmployee, address: e.target.value })}
                                sx={{ marginBottom: 2, mx: 1 }}
                            />
                            <TextField
                                label="Phone Number"
                                variant="outlined"
                                fullWidth
                                value={editingEmployee?.phoneNumber || newEmployee.phoneNumber}
                                onChange={(e) => editingEmployee ? setEditingEmployee({ ...editingEmployee, PhoneNumber: e.target.value })
                                    : setNewEmployee({ ...newEmployee, PhoneNumber: e.target.value })}
                                sx={{ marginBottom: 2, mx: 1 }}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={editingEmployee?.email || newEmployee.email}
                                onChange={(e) => editingEmployee ? setEditingEmployee({ ...editingEmployee, Email: e.target.value })
                                    : setNewEmployee({ ...newEmployee, Email: e.target.value })}
                                sx={{ marginBottom: 2, mx: 1 }}
                            />

                        </Stack>


                        <FormControl fullWidth sx={{ marginBottom: 3, mx: 1 }}>
                            <InputLabel id="demo-simple-select-helper-label"
                            >Select Department</InputLabel>
                            <Select labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Select Department"
                                value={selectedDept}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    setSelectedDept(value);
                                    console.log(value);

                                    if (editingEmployee) {
                                        setEditingEmployee({ ...editingEmployee, DeptId: value });
                                    } else {
                                        setNewEmployee({ ...newEmployee, DeptId: value });
                                    }
                                }}
                            >
                                {departments.map((dept) => (
                                    <MenuItem key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>


                        <FormControl fullWidth sx={{ marginBottom: 3, mx: 1 }}>
                            <InputLabel id="demo-simple-select-helper-label"
                            >Select Role</InputLabel>
                            <Select labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Select Role"
                                value={selectedRole}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    setSelectedRole(value);
                                    console.log(value);

                                    if (editingEmployee) {
                                        setEditingEmployee({ ...editingEmployee, RoleId: value });
                                    } else {
                                        setNewEmployee({ ...newEmployee, RoleId: value });
                                    }
                                }}

                            >
                                {roles.map((role) => (
                                    <MenuItem key={role.id} value={role.id}>
                                        {role.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>


                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
                    <Button onClick={handleAddOrEditEmployee} color="primary">Update Employee</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openDialogview} onClose={handleCloseDialogview} maxWidth="md" fullWidth>
                <DialogTitle>Employee Details</DialogTitle>
                <DialogContent>
                    {employeesview.map(emp => (
                        <Stack key={emp.id}>
                            <Stack sx={{ pt: 3 }} direction="row">
                                <TextField
                                    label="Last Name"
                                    variant="outlined"

                                    fullWidth
                                    value={emp.lastName}
                                    disabled
                                    sx={{
                                        marginBottom: 2, mx: 1
                                    }}
                                />
                                <TextField
                                    label="Address"
                                    variant="outlined"
                                    fullWidth
                                    value={emp.address}
                                    disabled
                                    sx={{
                                        marginBottom: 2, mx: 1
                                    }}
                                />

                            </Stack>
                            <Stack sx={{ pt: 1 }} direction="row">
                                <TextField
                                    label="Department"
                                    variant="outlined"
                                    fullWidth
                                    value={emp.departmentName}
                                    disabled
                                    sx={{
                                        marginBottom: 2, mx: 1, width: 300
                                    }}
                                />
                                <TextField
                                    label="Role"
                                    variant="outlined"
                                    fullWidth
                                    value={emp.roleName}
                                    disabled
                                    sx={{
                                        marginBottom: 2, mx: 1,
                                    }}

                                />
                                <TextField
                                    label="Phone Number"
                                    variant="outlined"
                                    fullWidth
                                    value={emp.phoneNumber}
                                    disabled
                                    sx={{
                                        marginBottom: 2, mx: 1,
                                    }}
                                />
                            </Stack>


                        </Stack>


                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogview} color="secondary">Cancelnow</Button>

                </DialogActions>


            </Dialog>

            <Snackbar open={openalert} autoHideDuration={3000} onClose={() => setopenalert(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert severity={severity}>
                    <AlertTitle>{severity === "success" ? "Success" : "Error"}</AlertTitle>
                    {getreturn}
                </Alert>
            </Snackbar>
        </Container>

    );
}

export default EmployeeList;

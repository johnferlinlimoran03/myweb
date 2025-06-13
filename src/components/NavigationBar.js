import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Collapse,
  IconButton,
  useMediaQuery,
  useTheme,
  ListItemIcon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReportIcon from '@mui/icons-material/Assessment';
import LockIcon from '@mui/icons-material/Lock'; // Icon for Single Sign-On

import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

// Purchasing System menu items with unique icons
const purchasingItems = [
  { name: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { name: 'Purchase Requests', path: '/requests', icon: <ReceiptIcon /> },
  { name: 'Purchase Orders', path: '/orders', icon: <ShoppingCartIcon /> },
  { name: 'Vendors', path: '/vendors', icon: <StoreIcon /> },
  { name: 'Items', path: '/items', icon: <InventoryIcon /> },
  { name: 'Inventory', path: '/inventory', icon: <InventoryIcon /> },
  { name: 'Reports', path: '/reports', icon: <ReportIcon /> }
];

// Remittance System replaced with a Single Sign-On menu item
const remittanceItems = [
  { name: 'Single Sign-On', path: '/sso', icon: <LockIcon /> }
];

const NavigationBar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isPurchasingOpen, setIsPurchasingOpen] = useState(false);
  const [isRemittanceOpen, setIsRemittanceOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawerContent = (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        {/* Purchasing System */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => setIsPurchasingOpen(!isPurchasingOpen)}>
            <ListItemText primary="Purchasing System" sx={{ color: '#fff' }} />
            <IconButton sx={{ color: '#fff' }}>
              {isPurchasingOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </ListItemButton>
        </ListItem>

        <Collapse in={isPurchasingOpen} timeout="auto" unmountOnExit>
          <List>
            {purchasingItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  selected={location.pathname === item.path}
                  sx={{
                    '&.Mui-selected': { backgroundColor: '#81b1ce', color: '#fff' },
                    '&:hover': { backgroundColor: '#81b1ce', color: '#fff' }
                  }}
                >
                  <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>

        {/* Single Sign-On */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/sso" selected={location.pathname === "/sso"}>
            <ListItemIcon sx={{ color: '#fff' }}><LockIcon /></ListItemIcon>
            <ListItemText primary="Single Sign-On" sx={{ color: '#fff' }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <Toolbar sx={{ backgroundColor: '#0033A0', color: '#fff' }}>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Navigation</Typography>
        </Toolbar>
      )}

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        anchor="left"
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#151269',
            color: '#fff'
          }
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default NavigationBar;
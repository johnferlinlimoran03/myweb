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
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';


const drawerWidth = 240;

const menuItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Purchase Requests', path: '/requests' },
  { name: 'Purchase Orders', path: '/orders' },
  { name: 'Vendors', path: '/vendors' },
  { name: 'Items', path: '/items' },
  { name: 'Inventory', path: '/inventory' },
  { name: 'Reports', path: '/reports' }
];

const NavigationBar = () => {
   const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
const drawerContent = (
    <>
      <Toolbar>
        <Typography variant="h6" sx={{ color: '#FFA000' }}>
          Purchasing System
        </Typography>
      </Toolbar>
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                onClick={() => isMobile && setMobileOpen(false)} // Close on mobile tap
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: '#FFA000',
                    color: '#fff'
                  },
                  '&:hover': {
                    backgroundColor: '#FFA000',
                    color: '#fff'
                  }
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
return (
    <>
      {isMobile && (
        <Toolbar sx={{ backgroundColor: '#0D47A1', color: '#fff' }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ color: '#FFA000' }}>
            Purchasing System
          </Typography>
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
            backgroundColor: '#0D47A1',
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



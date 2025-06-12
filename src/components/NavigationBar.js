import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Box } from '@mui/material';
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

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#0D47A1', // Deep blue
          color: '#fff'
        }
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ color: '#FFA000' }}> {/* Vivid orange */}
          Purchasing System
        </Typography>
      </Toolbar>
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map(item => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: '#FFA000', // orange highlight
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
    </Drawer>
  );
};

export default NavigationBar;

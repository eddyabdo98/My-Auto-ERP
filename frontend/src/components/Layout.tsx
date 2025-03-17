import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Divider,
  Collapse,
  ListItemButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Logout as LogoutIcon,
  Inventory as InventoryIcon,
  ShoppingCart as PurchaseIcon,
  LocalShipping as SalesIcon,
  AccountBalance as AccountingIcon,
  Settings as SettingsIcon,
  Assignment as ReportsIcon,
  ExpandLess,
  ExpandMore,
  LocalOffer as ProductsIcon,
  Category as CategoriesIcon,
  Store as SuppliersIcon,
  Group as CustomersIcon,
  Receipt as InvoicesIcon,
  LocalAtm as PaymentsIcon,
  Assessment as AnalyticsIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const drawerWidth = 240;

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [salesOpen, setSalesOpen] = useState(false);
  const [accountingOpen, setAccountingOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Users', icon: <PeopleIcon />, path: '/users' },
    {
      text: 'Inventory',
      icon: <InventoryIcon />,
      submenu: [
        { text: 'Products', icon: <ProductsIcon />, path: '/inventory/products' },
        { text: 'Categories', icon: <CategoriesIcon />, path: '/inventory/categories' },
      ],
    },
    {
      text: 'Purchase',
      icon: <PurchaseIcon />,
      submenu: [
        { text: 'Purchase Orders', icon: <ShoppingCart />, path: '/purchase/orders' },
        { text: 'Suppliers', icon: <SuppliersIcon />, path: '/purchase/suppliers' },
      ],
    },
    {
      text: 'Sales',
      icon: <SalesIcon />,
      submenu: [
        { text: 'Sales Orders', icon: <LocalShipping />, path: '/sales/orders' },
        { text: 'Customers', icon: <CustomersIcon />, path: '/sales/customers' },
      ],
    },
    {
      text: 'Accounting',
      icon: <AccountingIcon />,
      submenu: [
        { text: 'Invoices', icon: <InvoicesIcon />, path: '/accounting/invoices' },
        { text: 'Payments', icon: <PaymentsIcon />, path: '/accounting/payments' },
      ],
    },
    { text: 'Reports', icon: <ReportsIcon />, path: '/reports' },
    { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const handleSubmenuClick = (menu: string) => {
    switch (menu) {
      case 'Inventory':
        setInventoryOpen(!inventoryOpen);
        break;
      case 'Purchase':
        setPurchaseOpen(!purchaseOpen);
        break;
      case 'Sales':
        setSalesOpen(!salesOpen);
        break;
      case 'Accounting':
        setAccountingOpen(!accountingOpen);
        break;
    }
  };

  const renderMenuItem = (item: any) => {
    if (item.submenu) {
      const isOpen = 
        (item.text === 'Inventory' && inventoryOpen) ||
        (item.text === 'Purchase' && purchaseOpen) ||
        (item.text === 'Sales' && salesOpen) ||
        (item.text === 'Accounting' && accountingOpen);

      return (
        <>
          <ListItemButton onClick={() => handleSubmenuClick(item.text)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.submenu.map((subItem: any) => (
                <ListItemButton
                  key={subItem.text}
                  sx={{ pl: 4 }}
                  onClick={() => {
                    navigate(subItem.path);
                    setMobileOpen(false);
                  }}
                >
                  <ListItemIcon>{subItem.icon}</ListItemIcon>
                  <ListItemText primary={subItem.text} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </>
      );
    }

    return (
      <ListItemButton
        onClick={() => {
          navigate(item.path);
          setMobileOpen(false);
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    );
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <div key={item.text}>
            {renderMenuItem(item)}
            {['Dashboard', 'Users', 'Accounting', 'Analytics'].includes(item.text) && (
              <Divider sx={{ my: 1 }} />
            )}
          </div>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            My Auto ERP
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user?.username}
          </Typography>
          <Button color="inherit" onClick={logout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
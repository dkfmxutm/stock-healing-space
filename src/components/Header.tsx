import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import { 
  Menu as MenuIcon,
  BookOutlined,
  HomeOutlined,
  EditOutlined,
  AccountBalanceWalletOutlined,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 1px 0 rgba(0,0,0,0.08)',
  color: theme.palette.text.primary,
}));

const DrawerContent = styled(Box)(({ theme }) => ({
  width: 280,
  paddingTop: theme.spacing(2),
}));

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  page: 'home' | 'diary' | 'portfolio';
}

interface HeaderProps {
  onPageChange: (page: 'home' | 'diary' | 'portfolio') => void;
}

const Header: React.FC<HeaderProps> = ({ onPageChange }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      text: '홈',
      icon: <HomeOutlined />,
      page: 'home',
    },
    {
      text: '투자 일기',
      icon: <EditOutlined />,
      page: 'diary',
    },
    {
      text: '포트폴리오 관리',
      icon: <AccountBalanceWalletOutlined />,
      page: 'portfolio',
    },
  ];

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleMenuClick = (page: 'home' | 'diary' | 'portfolio') => {
    onPageChange(page);
    setDrawerOpen(false);
  };

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="primary"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 700,
              background: 'linear-gradient(45deg, #00A86B 30%, #1B3C35 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            마음치유 공간
          </Typography>
          <IconButton 
            color="primary"
            onClick={() => handleMenuClick('diary')}
            sx={{ 
              '&:hover': {
                backgroundColor: 'rgba(0,168,107,0.08)',
              }
            }}
          >
            <BookOutlined />
          </IconButton>
        </Toolbar>
      </StyledAppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <DrawerContent
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => handleMenuClick(item.page)}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(0,168,107,0.08)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: 'primary.main' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{
                      sx: { 
                        fontWeight: 600,
                        letterSpacing: '-0.01em',
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;


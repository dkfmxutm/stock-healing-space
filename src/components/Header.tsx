import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#FFB6C1', // Light pink color
});

const Header: React.FC = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          마음치유 공간
        </Typography>
        <IconButton color="inherit">
          <Favorite />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;


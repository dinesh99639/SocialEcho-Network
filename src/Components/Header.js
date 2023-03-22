import { useState } from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Avatar,
} from '@mui/material';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleProfileOutsideClick = () => setAnchorEl(null);

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar
        style={{ minHeight: '7vh', backgroundColor: 'white', color: '#5a5a5a' }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontSize: { xs: '14px', sm: '18px' } }}
        >
          SocialEcho Network
        </Typography>
        <div>
          <IconButton size="small" color="inherit" onClick={handleProfileClick}>
            <Avatar
              sx={{
                width: '30px',
                height: '30px',
                fontSize: '15px',
                backgroundColor: '#00aef1',
              }}
            >
              D
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            open={!!anchorEl}
            onClose={handleProfileOutsideClick}
          >
            <MenuItem onClick={handleProfileOutsideClick}>
              Switch Account
            </MenuItem>
            <MenuItem onClick={handleProfileOutsideClick}>Sign out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

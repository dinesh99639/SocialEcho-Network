import { useState } from 'react';
import { connect } from 'react-redux';

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';

import database from '../Store/Reducers/database';
import application from '../Store/Reducers/application';

import SwitchAccount from './SwitchAccount/SwitchAccount';

const Header = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [switchAccountModalOpen, setSwitchAccountModalOpen] = useState(false);

  return (
    <>
      <AppBar position="static" elevation={1}>
        <Toolbar
          style={{
            minHeight: '7vh',
            maxHeight: '7vh',
            backgroundColor: '#9100ff',
            color: 'white',
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontSize: { xs: '14px', sm: '18px' } }}
          >
            SocialEcho Network
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              sx={{ margin: '0 5px', display: { xs: 'none', sm: 'block' } }}
            >
              {props.currentUser.name}
            </Typography>

            <IconButton
              size="small"
              color="inherit"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <Avatar
                sx={{
                  width: '30px',
                  height: '30px',
                  fontSize: '15px',
                  backgroundColor: '#00aef1',
                }}
              >
                {props.currentUser.name.slice(0, 1)}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  setSwitchAccountModalOpen(true);
                  setAnchorEl(null);
                }}
              >
                Switch Account
              </MenuItem>

              <MenuItem
                onClick={() => {
                  props.databaseReset();
                  props.applicationReset();
                  setAnchorEl(null);
                }}
              >
                Reset data
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <SwitchAccount
        open={switchAccountModalOpen}
        handleClose={() => setSwitchAccountModalOpen(false)}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  const { application } = state;

  return { currentUser: application.currentUser };
};

const mapDispatchToProps = {
  databaseReset: database.actions.reset,
  applicationReset: application.actions.reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

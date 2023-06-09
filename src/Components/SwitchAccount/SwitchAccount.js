import { useState, useContext } from 'react';
import { connect } from 'react-redux';

import {
  Box,
  Typography,
  Modal,
  Grid,
  TextField,
  Autocomplete,
  Button,
} from '@mui/material';

import { SnackbarContext } from '../../Contexts/Snackbar';

import database from '../../Store/Reducers/database';
import application from '../../Store/Reducers/application';

const SwitchAccount = (props) => {
  const allUsers = Object.values(props.allUsers);

  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: '',
    name: '',
    totalPosts: 0,
    totalLikes: 0,
    lastPostedTimestamp: 0,
    dailyStreaks: 0,
  });

  const snackbar = useContext(SnackbarContext);

  const handleLogin = () => {
    props.changeUser(selectedUser);
    setSelectedUser(null);
    props.handleClose();

    snackbar.setSnack({
      open: true,
      type: 'success',
      message: 'Login successful',
    });
  };

  const handleRegister = () => {
    const existingUsers = allUsers.filter(
      (user) => user.username === newUser.username,
    );
    if (existingUsers.length === 0) {
      const userId = new Date().getTime();

      props.addUser({ id: userId, ...newUser });
      props.changeUser({ id: userId, ...newUser });
      snackbar.setSnack({
        open: true,
        type: 'success',
        message: 'Registration successful',
      });
      props.handleClose();
    } else {
      snackbar.setSnack({
        open: true,
        type: 'error',
        message: 'User already exists',
      });
    }
  };

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '80%', sm: '600px', md: '700px' },
          bgcolor: 'background.paper',
          border: 'none',
          borderRadius: '4px',
          boxShadow: 24,
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            align="center"
            sx={{
              borderBottom: { xs: '0.5px solid', sm: 'none' },
              borderRight: { xs: 'none', sm: '1px solid' },
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              rowGap: '10px',
            }}
          >
            <Typography variant="h6" component="h2">
              Login
            </Typography>

            <Autocomplete
              disablePortal
              options={allUsers}
              getOptionLabel={(option) => option?.name ?? ''}
              onChange={(e, values) => setSelectedUser(values)}
              renderInput={(params) => (
                <TextField {...params} label="User" variant="standard" />
              )}
            />

            <Typography sx={{ p: 1.5 }}>
              Username: {selectedUser?.username ?? 'Not found'}
            </Typography>

            <Button
              size="small"
              variant="contained"
              disabled={!selectedUser?.username}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            align="center"
            sx={{
              borderleft: { xs: 'none', sm: '1px solid' },
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              rowGap: '10px',
            }}
          >
            <Typography variant="h6" component="h2">
              Register
            </Typography>
            <TextField
              label="Username"
              variant="standard"
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, username: e.target.value }))
              }
            />
            <TextField
              label="Name"
              variant="standard"
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, name: e.target.value }))
              }
            />

            <Button
              size="small"
              variant="contained"
              onClick={handleRegister}
              disabled={!newUser.username || !newUser.name}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  const { database } = state;

  return { allUsers: database.users };
};

const mapDispatchToProps = {
  changeUser: application.actions.changeUser,
  addUser: database.actions.addUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SwitchAccount);

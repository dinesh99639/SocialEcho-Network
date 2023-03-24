import { useState } from 'react';
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

import application from '../../Store/Reducers/application';

const SwitchAccount = (props) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleLogin = () => {
    props.changeUser(selectedUser);
    props.handleClose();
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
              options={props.allUsers}
              getOptionLabel={(option) => option?.name ?? ''}
              inputValue={selectedUser?.name ?? ''}
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
            <TextField label="Username" variant="standard" />
            <TextField label="Name" variant="standard" />

            <Button size="small" variant="contained">
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
};

export default connect(mapStateToProps, mapDispatchToProps)(SwitchAccount);

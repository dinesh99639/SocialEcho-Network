import { connect } from 'react-redux';

import { Avatar, Box, Grid, Paper, Tooltip, Typography } from '@mui/material';

import VrpanoIcon from '@mui/icons-material/Vrpano';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WhatshotIcon from '@mui/icons-material/Whatshot';

import getLastPostedDaysBack from '../../Utils/getLastPostedDaysBack';

const AccountDetails = (props) => {
  const currentUser = props.users[props.currentUser.id];

  const lastPostedDaysBack = getLastPostedDaysBack(
    currentUser.lastPostedTimestamp,
  );

  return (
    <Box sx={{ padding: '20px' }}>
      <Paper
        elevation={1}
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px 0',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            backgroundColor: '#9100ff',
            height: '72px',
            width: '100%',
            borderRadius: '4px',
          }}
        ></Box>
        <Avatar
          sx={{
            width: '80px',
            height: '80px',
            margin: '10px',
            backgroundColor: '#009bd1',
          }}
        ></Avatar>

        <Typography sx={{ textAlign: 'center' }}>{currentUser.name}</Typography>
        <Typography
          fontSize="12px"
          color="#878787"
          sx={{ textAlign: 'center' }}
        >
          {currentUser.username}
        </Typography>

        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography fontSize="15px" sx={{ margin: '10px' }}>
            Posts
          </Typography>
          <Grid container>
            <Grid
              item
              xs={4}
              sx={{
                borderRight: '1px solid',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Tooltip title="Posts" placement="top">
                <VrpanoIcon sx={{ fontSize: 'px', color: '#4095ff' }} />
              </Tooltip>
              <Typography fontSize="13px">{currentUser.totalPosts}</Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Tooltip title="Likes" placement="top">
                <FavoriteIcon sx={{ fontSize: 'px', color: '#ff008c' }} />
              </Tooltip>
              <Typography fontSize="13px">{currentUser.totalLikes}</Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                borderLeft: '1px solid',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Tooltip title="Daily streak" placement="top">
                <WhatshotIcon
                  sx={{
                    fontSize: 'px',
                    color: lastPostedDaysBack === 0 ? '#ffa500' : '#adadad',
                  }}
                />
              </Tooltip>
              <Typography fontSize="13px">
                {lastPostedDaysBack < 2 ? currentUser.dailyStreaks : 0}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

const mapStateToProps = (state) => {
  const { application, database } = state;

  return { currentUser: application.currentUser, users: database.users };
};

export default connect(mapStateToProps)(AccountDetails);

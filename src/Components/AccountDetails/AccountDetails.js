import { Avatar, Box, Grid, Paper, Tooltip, Typography } from '@mui/material';

import VrpanoIcon from '@mui/icons-material/Vrpano';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const AccountDetails = () => {
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
            backgroundColor: 'black',
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

        <Typography sx={{ textAlign: 'center' }}>Dinesh Somaraju</Typography>
        <Typography
          fontSize="12px"
          color="#878787"
          sx={{ textAlign: 'center' }}
        >
          dinesh.somaraju
        </Typography>

        <Box sx={{ margin: '5px', width: '100%', textAlign: 'center' }}>
          <Typography sx={{ margin: '10px' }}>Posts</Typography>
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
                <VrpanoIcon sx={{ fontSize: '30px', color: '#4095ff' }} />
              </Tooltip>
              <Typography fontSize="14px">10</Typography>
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
                <FavoriteIcon sx={{ fontSize: '30px', color: '#ff008c' }} />
              </Tooltip>
              <Typography fontSize="14px">176</Typography>
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
                <WhatshotIcon sx={{ fontSize: '30px', color: '#ffa500' }} />
              </Tooltip>
              <Typography fontSize="14px">12</Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default AccountDetails;

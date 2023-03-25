import { connect } from 'react-redux';
import Jdenticon from 'react-jdenticon';

import { Box, Paper, Tooltip, Typography } from '@mui/material';

import WhatshotIcon from '@mui/icons-material/Whatshot';

import getLastPostedDaysBack from '../../Utils/getLastPostedDaysBack';

const Contacts = (props) => {
  const contacts = props.allUsers;
  const currentUser = props.currentUser;

  return (
    <Box sx={{ padding: '20px' }}>
      <Paper
        elevation={1}
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          sx={{
            padding: '5px 0',
            textAlign: 'center',
            backgroundColor: 'black',
            color: 'white',
            width: '100%',
            borderRadius: '4px',
          }}
        >
          Contacts
        </Typography>

        <Box>
          {contacts
            .filter((contact) => contact.username !== currentUser.username)
            .map((contact) => {
              const lastPostedDaysBack = getLastPostedDaysBack(
                contact.lastPostedTimestamp,
              );

              return (
                <Box
                  key={contact.username}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '5px 13px',
                    borderTop: '1px solid',
                    columnGap: '10px',
                  }}
                >
                  <Box sx={{ '& div': { height: '28px' } }}>
                    <Jdenticon size="28" value={contact.name} />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '15rem',
                    }}
                  >
                    <Typography variant="div" noWrap>
                      {contact.name}
                    </Typography>
                    <Typography
                      variant="div"
                      fontSize="13px"
                      color="#919191"
                      noWrap
                    >
                      {contact.username}
                    </Typography>
                  </Box>
                  <Box sx={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <Tooltip
                      title="Daily streak"
                      placement="left"
                      PopperProps={{
                        modifiers: [
                          { name: 'offset', options: { offset: [0, -10] } },
                        ],
                      }}
                    >
                      <WhatshotIcon
                        sx={{
                          fontSize: '20px',
                          color:
                            lastPostedDaysBack === 0 ? '#ffa500' : '#adadad',
                        }}
                      />
                    </Tooltip>
                    <Typography fontSize="12px" sx={{ marginRight: '5px' }}>
                      {lastPostedDaysBack < 2 ? contact.dailyStreaks : 0}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Paper>
    </Box>
  );
};

const mapStateToProps = (state) => {
  const { database, application } = state;

  return { allUsers: database.users, currentUser: application.currentUser };
};

export default connect(mapStateToProps)(Contacts);

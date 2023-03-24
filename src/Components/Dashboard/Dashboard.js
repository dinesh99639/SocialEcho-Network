import { Grid } from '@mui/material';

import AccountDetails from '../AccountDetails/AccountDetails';
import Contacts from '../Contacts/Contacts';

const Dashboard = () => {
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={0}
          sm={5}
          md={3}
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          <AccountDetails />
        </Grid>
        <Grid item xs={12} sm={7} md={6}>
          M
        </Grid>
        <Grid
          item
          xs={0}
          sm={0}
          md={3}
          sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}
        >
          <Contacts />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;

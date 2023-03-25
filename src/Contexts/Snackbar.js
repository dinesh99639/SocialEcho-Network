import { useState, createContext, forwardRef } from 'react';

import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

export const SnackbarContext = createContext();

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = (props) => {
  const [snack, setSnack] = useState({
    open: false,
    type: 'success',
    message: '',
  });

  const hideSnack = () => {
    setSnack({ open: false, type: 'success', message: '' });
  };

  return (
    <SnackbarContext.Provider value={{ setSnack }}>
      {props.children}

      <Snackbar
        open={snack.open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={3000}
        transitionDuration={{ enter: 500, exit: 0 }}
        onClose={hideSnack}
      >
        <Alert onClose={hideSnack} severity={snack.type} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackBar;

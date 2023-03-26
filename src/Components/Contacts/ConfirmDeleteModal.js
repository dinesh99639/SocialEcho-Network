import { Box, Modal, Typography, Button } from '@mui/material';

const ConfirmDeleteModal = (props) => {
  return (
    <Modal open={props.open}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          borderRadius: '4px',
          boxShadow: 24,
          p: 1,
        }}
      >
        <Typography sx={{ textAlign: 'center' }}>Confim Delete</Typography>
        <Typography sx={{ mt: 2, textAlign: 'center' }}>
          {props.message}
        </Typography>
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            justifyContent: 'center',
            columnGap: '10px',
          }}
        >
          <Button
            size="small"
            variant="outlined"
            sx={{
              margin: '5px 0',
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={props.onConfirm}
          >
            Yes
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{
              margin: '5px 0',
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={props.onCancel}
          >
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteModal;

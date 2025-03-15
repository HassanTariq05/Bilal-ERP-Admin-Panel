import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 500,
  bgcolor: 'white',
  borderRadius: '12px',
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
};

export default function DeleteConfirmationModal({ open, onClose, onConfirm, title, desc }) {
  const handleSave = () => {
    onConfirm();
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          {/* Header */}
          <Typography id="modal-title" variant="h3" component="h2" className="font-bold text-gray-900">
            {title}
          </Typography>

          {/* Body */}

          <Typography id="modal-description" variant="h5" component="h3" className="font-bold text-gray-900">
            {desc}
          </Typography>
          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button variant="text" startIcon={<CloseIcon />} color="primary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="outlined" startIcon={<DoneOutlineOutlinedIcon />} color="primary" onClick={handleSave}>
              Yes
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}

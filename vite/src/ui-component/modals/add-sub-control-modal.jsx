import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { SaveOutlined } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

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

export default function AddSubControlAccountModal({ open, onClose, accountName, setAccountName, accountNumber, setAccountNumber, onSave }) {
  const [errors, setErrors] = React.useState({ accountName: '', accountNumber: '' });

  // Handle input changes and clear errors
  const handleAccountNameChange = (e) => {
    setAccountName(e.target.value);
    if (errors.accountName) setErrors((prev) => ({ ...prev, accountName: '' }));
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
    if (errors.accountNumber) setErrors((prev) => ({ ...prev, accountNumber: '' }));
  };

  const handleSave = () => {
    let newErrors = { accountName: '', accountNumber: '' };

    if (!accountName.trim()) {
      newErrors.accountName = 'Account Name is required';
    }

    if (!accountNumber.trim()) {
      newErrors.accountNumber = 'Account Number is required';
    } else if (!/^\d+$/.test(accountNumber)) {
      newErrors.accountNumber = 'Account Number must be numeric';
    }

    setErrors(newErrors);

    if (!newErrors.accountName && !newErrors.accountNumber) {
      onSave();
    }
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
          <Typography id="modal-title" variant="h4" component="h2" className="font-bold text-gray-900">
            Add New Account
          </Typography>

          {/* Body */}
          <TextField
            fullWidth
            label="Account Name"
            variant="outlined"
            value={accountName}
            onChange={handleAccountNameChange}
            error={!!errors.accountName}
            helperText={errors.accountName}
          />

          <TextField
            fullWidth
            label="Account Number"
            variant="outlined"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            error={!!errors.accountNumber}
            helperText={errors.accountNumber}
          />

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button variant="text" startIcon={<CloseIcon />} color="primary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="outlined" startIcon={<SaveOutlined />} color="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}

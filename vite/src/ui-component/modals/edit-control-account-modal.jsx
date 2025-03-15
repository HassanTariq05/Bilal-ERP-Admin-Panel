import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
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

export default function EditControlAccountModal({ open, onClose, selectedRow, onSave }) {
  const [accountName, setAccountName] = React.useState('');
  const [accountNumber, setAccountNumber] = React.useState('');
  const [mainAccount, setMainAccount] = React.useState('');
  const [errors, setErrors] = React.useState({ accountName: '', accountNumber: '', mainAccount: '' });

  React.useEffect(() => {
    if (selectedRow) {
      setAccountName(selectedRow.accountName || '');
      setAccountNumber(selectedRow.account || '');
      setMainAccount(selectedRow.mainAccount || '');
    }
  }, [selectedRow]);

  const handleAccountNameChange = (e) => {
    setAccountName(e.target.value);
    if (errors.accountName) setErrors((prev) => ({ ...prev, accountName: '' }));
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
    if (errors.accountNumber) setErrors((prev) => ({ ...prev, accountNumber: '' }));
  };

  const handleMainAccountChange = (e) => {
    setMainAccount(e.target.value);
    if (errors.mainAccount) setErrors((prev) => ({ ...prev, mainAccount: '' }));
  };

  const handleSave = () => {
    let newErrors = { accountName: '', accountNumber: '', mainAccount: '' };

    if (!accountName.trim()) {
      newErrors.accountName = 'Account Name is required';
    }

    if (!accountNumber.trim()) {
      newErrors.accountNumber = 'Account Number is required';
    } else if (!/^\d+$/.test(accountNumber)) {
      newErrors.accountNumber = 'Account Number must be numeric';
    }

    if (!mainAccount) {
      newErrors.mainAccount = 'Main Account is required';
    }

    setErrors(newErrors);

    if (!newErrors.accountName && !newErrors.accountNumber && !newErrors.mainAccount) {
      onSave({ ...selectedRow, accountName, account: accountNumber, mainAccount });
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
          <Typography id="modal-title" variant="h4" component="h2" className="font-bold text-gray-900">
            Edit Account
          </Typography>

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

          <TextField
            select
            fullWidth
            label="Main Account"
            variant="outlined"
            value={mainAccount}
            onChange={handleMainAccountChange}
            error={!!errors.mainAccount}
            helperText={errors.mainAccount}
          >
            <MenuItem value="Checking">Checking</MenuItem>
            <MenuItem value="Savings">Savings</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Investment">Investment</MenuItem>
          </TextField>

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

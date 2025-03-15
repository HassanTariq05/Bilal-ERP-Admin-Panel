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

export default function EditTransactionAccountModal({ open, onClose, selectedRow, onSave }) {
  const [accountName, setAccountName] = React.useState('');
  const [accountNumber, setAccountNumber] = React.useState('');
  const [subControlAccount, setSubControlAccount] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [accountType, setAccountType] = React.useState('');
  const [errors, setErrors] = React.useState({
    accountName: '',
    accountNumber: '',
    subControlAccount: '',
    status: '',
    accountType: ''
  });

  React.useEffect(() => {
    if (selectedRow) {
      setAccountName(selectedRow.accountName || '');
      setAccountNumber(selectedRow.account || '');
      setSubControlAccount(selectedRow.subControlAccount || '');
      setStatus(selectedRow.status || '');
      setAccountType(selectedRow.accountType || '');
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

  const handleSubControlAccountChange = (e) => {
    setSubControlAccount(e.target.value);
    if (errors.subControlAccount) setErrors((prev) => ({ ...prev, subControlAccount: '' }));
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    if (errors.status) setErrors((prev) => ({ ...prev, status: '' }));
  };

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
    if (errors.accountType) setErrors((prev) => ({ ...prev, accountType: '' }));
  };

  const handleSave = () => {
    let newErrors = { accountName: '', accountNumber: '', subControlAccount: '', status: '', accountType: '' };

    if (!accountName.trim()) {
      newErrors.accountName = 'Account Name is required';
    }

    if (!accountNumber.trim()) {
      newErrors.accountNumber = 'Account Number is required';
    } else if (!/^\d+$/.test(accountNumber)) {
      newErrors.accountNumber = 'Account Number must be numeric';
    }

    if (!subControlAccount) {
      newErrors.subControlAccount = 'Sub Control Account is required';
    }

    if (!status) {
      newErrors.status = 'Status is required';
    }

    if (!accountType) {
      newErrors.accountType = 'Account Type is required';
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === '')) {
      onSave({ ...selectedRow, accountName, account: accountNumber, subControlAccount, status, accountType });
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
            label="Sub Control Account"
            variant="outlined"
            value={subControlAccount}
            onChange={handleSubControlAccountChange}
            error={!!errors.subControlAccount}
            helperText={errors.subControlAccount}
          >
            <MenuItem value="Loans">Loans</MenuItem>
            <MenuItem value="Savings">Savings</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Investment">Investment</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Status"
            variant="outlined"
            value={status}
            onChange={handleStatusChange}
            error={!!errors.status}
            helperText={errors.status}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Account Type"
            variant="outlined"
            value={accountType}
            onChange={handleAccountTypeChange}
            error={!!errors.accountType}
            helperText={errors.accountType}
          >
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
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

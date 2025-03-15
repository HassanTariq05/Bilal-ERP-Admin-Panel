import React, { useState } from 'react';
import DataTable from '../../../../ui-component/table';
import MainCard from '../../../../ui-component/cards/MainCard';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddMainAccountModal from '../../../../ui-component/modals/add-main-account-modal';
import { dummyMainAccountsData } from '../../../../data/dummy-data';
import { useNavigate } from 'react-router-dom';

function ChartOfAccounts() {
  const [accounts, setAccounts] = useState(dummyMainAccountsData);
  const [modalOpen, setModalOpen] = useState(false);
  const [accountName, setAccountName] = useState('');

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleSave = () => {
    if (!accountName.trim()) return;

    const formatDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const newAccount = {
      id: accounts.length + 1,
      account: `ACC-${accounts.length + 1}`,
      accountName,
      date: formatDate() // Use formatted date
    };

    setAccounts([...accounts, newAccount]);
    setModalOpen(false);
    setAccountName('');
  };

  const navigate = useNavigate();

  const handleControlAccount = (row) => {
    console.log('Control account row:', row);

    navigate(`/pages/accounts/control-account/${row.id}`);
    // Add additional logic here if needed
  };

  const mainAccountColumns = [
    { id: 'id', label: 'ID' },
    { id: 'account', label: 'Account' },
    { id: 'accountName', label: 'Account Name' },
    { id: 'date', label: 'Date' },
    { id: 'actions', label: 'Actions' }
  ];

  return (
    <MainCard
      title="Main Account"
      secondary={
        <Button onClick={handleOpen} variant="outlined" startIcon={<AddIcon />} color="secondary">
          Add Account
        </Button>
      }
    >
      <AddMainAccountModal
        open={modalOpen}
        onClose={handleClose}
        accountName={accountName}
        setAccountName={setAccountName}
        onSave={handleSave}
      />
      <DataTable columns={mainAccountColumns} controlButtonTitle={'Control Account'} data={accounts} onControl={handleControlAccount} />
    </MainCard>
  );
}

export default ChartOfAccounts;

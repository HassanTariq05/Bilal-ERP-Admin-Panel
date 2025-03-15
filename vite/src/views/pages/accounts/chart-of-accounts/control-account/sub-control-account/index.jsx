import React, { useState } from 'react';
import DataTable from '../../../../../../ui-component/table';
import MainCard from '../../../../../../ui-component/cards/MainCard';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { dummySubControlAccountsData } from '../../../../../../data/dummy-data';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AddSubControlAccountModal from '../../../../../../ui-component/modals/add-sub-control-modal';
import EditSubControlAccountModal from '../../../../../../ui-component/modals/edit-sub-control-modal';
import DeleteConfirmationModal from '../../../../../../ui-component/modals/delete-confirmation-modal';

function SubControlAccount() {
  const [accounts, setAccounts] = useState(dummySubControlAccountsData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedRow, setSelectedRow] = useState();
  const [deleteId, setDeleteId] = useState();
  const { id, sub_id } = useParams();

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const handleEditModalClose = () => setEditModalOpen(false);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  const handleSave = () => {
    if (!accountName.trim()) return;
    if (!accountNumber.trim()) return;

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
      account: accountNumber,
      accountName,
      date: formatDate() // Use formatted date
    };

    setAccounts([...accounts, newAccount]);
    setModalOpen(false);
    setAccountName('');
  };

  const handleOnEditConfirm = (updatedAccount) => {
    setAccounts((prevAccounts) => prevAccounts.map((account) => (account.id === updatedAccount.id ? updatedAccount : account)));
    setEditModalOpen(false);
  };

  const navigate = useNavigate();

  const handleEdit = (row) => {
    if (row) {
      setSelectedRow(row);
      setEditModalOpen(true);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDeletion = () => {
    setAccounts((prevAccounts) => prevAccounts.filter((account) => account.id !== deleteId));
    setDeleteModalOpen(false);
  };

  const handleControlAccount = (row) => {
    console.log('Sub Control account row:', row);

    navigate(`/pages/accounts/transaction-account/${row.id}`);
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
      title={`(${id}) - (${sub_id}) Sub Control Account`}
      secondary={
        <Button onClick={handleOpen} variant="outlined" startIcon={<AddIcon />} color="secondary">
          Add New
        </Button>
      }
    >
      <AddSubControlAccountModal
        open={modalOpen}
        onClose={handleClose}
        accountName={accountName}
        setAccountName={setAccountName}
        accountNumber={accountNumber}
        setAccountNumber={setAccountNumber}
        onSave={handleSave}
      />

      <EditSubControlAccountModal
        open={editModalOpen}
        onClose={handleEditModalClose}
        selectedRow={selectedRow}
        onSave={handleOnEditConfirm}
      />

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleDeleteModalClose}
        onConfirm={handleConfirmDeletion}
        title={'Confirm'}
        desc={'Are you sure you want to delete this record?'}
      />
      <DataTable
        columns={mainAccountColumns}
        controlButtonTitle={'Transaction Account'}
        data={accounts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onControl={handleControlAccount}
      />
    </MainCard>
  );
}

export default SubControlAccount;

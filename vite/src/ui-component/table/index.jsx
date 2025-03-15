import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  TextField,
  IconButton,
  Button,
  Box,
  Toolbar,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Edit, Delete, Download, Print } from '@mui/icons-material';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';
import { unparse } from 'papaparse';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const DataTable = ({ columns, data, onEdit, onDelete, onControl, controlButtonTitle }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  // Sorting function
  const handleSort = (property) => {
    const isAscending = orderBy === property && order === 'asc';
    setOrder(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Search function
  const filteredRows = data.filter((row) =>
    Object.values(row).some((value) => value?.toString().toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Sorting logic
  const sortedRows = [...filteredRows].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination handlers
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const exportToExcel = () => {
    const ws = utils.json_to_sheet(filteredRows);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFile(wb, 'data.xlsx');
  };

  const exportToCSV = () => {
    const csv = unparse(filteredRows, { header: true });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);

    // Define table columns
    const tableColumn = columns.map((col) => col.label);

    // Define table rows
    const tableRows = filteredRows.map((row) => columns.map((col) => (row[col.id] ? row[col.id].toString() : '')));

    // Ensure `autoTable` is working
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: 'striped',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [44, 62, 80] }
    });

    // Save PDF
    doc.save('data.pdf');
  };

  const printTable = () => {
    window.print();
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
      {/* Header with Export Buttons */}
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Box>
          <Button variant="outlined" onClick={exportToCSV} startIcon={<DescriptionIcon />} color="secondary" sx={{ mr: 1 }}>
            CSV
          </Button>
          <Button variant="outlined" onClick={exportToExcel} startIcon={<ListAltIcon />} color="secondary" sx={{ mr: 1 }}>
            Excel
          </Button>
          <Button variant="outlined" onClick={exportToPDF} startIcon={<PictureAsPdfIcon />} color="secondary" sx={{ mr: 1 }}>
            PDF
          </Button>
          <Button variant="outlined" onClick={printTable} startIcon={<Print />} color="secondary">
            Print
          </Button>
        </Box>
      </Toolbar>

      {/* Search Input */}
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Table Container */}
      <TableContainer>
        <Table>
          {/* Table Header */}
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  {column.id !== 'actions' ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.id === 'actions' ? (
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {onControl && (
                          <Button onClick={() => onControl(row)} variant="outlined" startIcon={<AddIcon />} color="primary">
                            {controlButtonTitle}
                          </Button>
                        )}
                        {onEdit && (
                          <Button onClick={() => onEdit(row)} variant="outlined" startIcon={<EditOutlinedIcon />} color="secondary">
                            Edit
                          </Button>
                        )}
                        {onDelete && (
                          <Button onClick={() => onDelete(row.id)} variant="outlined" startIcon={<DeleteOutlineIcon />} color="error">
                            Delete
                          </Button>
                        )}
                      </div>
                    ) : (
                      row[column.id]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={sortedRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;

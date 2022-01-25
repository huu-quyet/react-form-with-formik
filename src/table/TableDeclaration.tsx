import {
  styled,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

import { makeStyles } from '@mui/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { deleteDataUser } from '../hook/customHook';
import { Box } from '@mui/system';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#d1e7dd',
    fontSize: '1.6rem',
    fontWeight: '700',
    border: '1px solid #ccc',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '1.6rem',
    border: '1px solid #ccc',
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&: hover': {
    background: '#eee',
  },
  '& a': {
    fontSize: '2rem',
    display: 'flex',
    alignItem: 'center',
  },
}));

const CustomPagination = styled(TablePagination)(() => ({
  '& .MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel, .MuiTablePagination-select':
    {
      fontSize: '1.6rem',
    },

  '&  .MuiTablePagination-menuItem, .MuiTablePagination-selectIcon': {
    fontSize: '2rem',
  },
}));

const pagStyles = makeStyles({
  root: {
    fontSize: '1.6rem',
  },

  icon: {
    fontSize: '3rem',
  },
  menuIcon: {
    fontSize: '1.6rem',
    background: '#d1e7dd',
  },
  active: {
    '& button': {
      padding: 0,
      margin: '0 0.6rem',
      border: '1px solid #ccc',
      '& svg': {
        width: '3rem',
        height: '3rem',
      },
    },
  },
});

interface Props {
  onDelete: (newData: any) => void;
  data: any;
}

const TableDeclaration = (props: Props) => {
  const styled = pagStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(-1);
  const history = useHistory();
  const data = props.data;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (e: any) => {
    const id = e.target.dataset.delete;
    if (!id) return;
    if (window.confirm(`Do you want delete form with id: ${id}`)) {
      const newData: any = deleteDataUser(id);
      props.onDelete(newData);
    }
  };

  const handleEdit = (e: any) => {
    const id = e.target.dataset.edit;
    if (!id) return;
    history.push(`/form/${id}`);
  };

  return (
    <React.Fragment>
      <TableContainer>
        <Table
          sx={{
            borderCollapse: 'collapse',
            width: '100%',
            fontSize: '1.6rem',
          }}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Form ID</StyledTableCell>
              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell>Object</StyledTableCell>
              <StyledTableCell>Date Of Birth</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell>Contact Province</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row: any, index: number) => {
              const date = new Date(row.birth);
              const day = date.getDate();
              const month = date.getMonth();
              const year = date.getFullYear();
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell
                    sx={{
                      gap: '2rem',
                    }}
                  >
                    <Box
                      sx={{ display: 'flex', gap: 2, alignItems: 'center ' }}
                    >
                      <SvgIcon
                        sx={{ cursor: 'pointer' }}
                        data-edit={row.id}
                        onClick={handleEdit}
                      >
                        <EditIcon
                          color="primary"
                          sx={{ fontSize: '2rem', height: '100%' }}
                        />
                      </SvgIcon>
                      <SvgIcon
                        onClick={handleDelete}
                        data-delete={row.id}
                        sx={{ fontSize: '2rem', cursor: 'pointer' }}
                      >
                        <DeleteForeverIcon color="error" />
                      </SvgIcon>
                      <p>{row.id}</p>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.object}</StyledTableCell>
                  <StyledTableCell>{`${day}/${month}/${year}`}</StyledTableCell>
                  <StyledTableCell>{row.gender}</StyledTableCell>
                  <StyledTableCell>{row.province}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        rowsPerPageOptions={[{ label: 'All', value: -1 }, 2, 4, 6]}
        labelRowsPerPage={'Items/page'}
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        classes={{
          actions: styled.active,
        }}
        sx={{
          border: 'none',
          fontSize: '1.6rem',
          margin: '4rem 0',
          display: 'flex',
          justifyContent: 'center',
        }}
      />
    </React.Fragment>
  );
};

export default TableDeclaration;

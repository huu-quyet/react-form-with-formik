import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDataUser, searchHandle } from '../hook/customHook';
import TableDeclaration from './TableDeclaration';

const styleLink = makeStyles({
  link: {
    textDecoration: 'none',
  },
});

const TablePage = () => {
  const classes = styleLink();
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    const fetchData = getDataUser();
    setDataUser(fetchData);
  }, []);

  const deleteHandle = (data: any) => {
    setDataUser(data);
  };

  const onSearchHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const newData: any = searchHandle(input);
    setDataUser(newData);
  };

  return (
    <Container maxWidth="lg" sx={{ padding: '4rem' }}>
      <Typography
        variant="h2"
        mb={'4rem'}
        textAlign={'center'}
        fontWeight="500"
      >
        Vietnam Health Declaration for foreign entry
      </Typography>
      <Box
        sx={{
          display: 'flex',
          marginBottom: '4rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <TextField
          size="small"
          type={'search'}
          sx={{ width: '40%', '& input': { fontSize: '1.6rem' } }}
          placeholder="Search..."
          onChange={onSearchHandle}
        />
        <Link to="/form" className={classes.link}>
          <Button variant="contained" color="success">
            New Form
          </Button>
        </Link>
      </Box>
      <TableDeclaration onDelete={deleteHandle} data={dataUser} />
    </Container>
  );
};

export default TablePage;

import { Container, Grid, Typography, IconButton, TableContainer, Table, TableRow, TableCell, TableHead, TableBody, TablePagination } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { getProducts } from '../utils';
import { DeleteForever, Edit } from '@material-ui/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

const columns = [
    {id: 'image', label: 'Image', minWidth: 100},
    {id: 'id', label: 'ID', minWidth: 30 },
    {id: 'name', label: 'Name', minWidth: 60 },
    {id: 'price', label: 'Price', mindWidth: 30 },
    {id: 'stock', label: 'Stock', minWidth: 30 },
    {id: 'featured', label: 'Featured', minWidth: 50 },
    {id: 'description', label: 'Description', minWidth: 100 },
    {id: 'rating', label: 'Rating', minWidth: 30 },
]

function AdminProductList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [ rows, setRows ] = useState([]);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    
    console.log(rows);

    const handleDelete = id => {
        setRows(rows.filter(row => row.id !== id));
        axios.delete(`http://localhost:3000/products/${id}`)
        .then(res => console.log('RESPUESTA DELETE: ', res.data))
        .catch(err => console.log('ERROR DELETE: ', err));
    };

    useEffect(() => {
        getProducts.then(res => {setRows(res.data)});
    }, []);

    return (
        <Container>
            <Typography variant='h3' align='center' >Product List</Typography>
            <Container>
                <Grid container >
                    <TableContainer >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows?.map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell>
                                                <Link to={`/admin/products/${row.id}/edit`} style={{cursor: 'pointer'}} onClick={() => console.log("hice click")} ><IconButton><Edit /></IconButton></Link>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton color='primary' onClick={() => handleDelete(row.id)} ><DeleteForever /></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Grid>
            </Container>
        </Container>
    );
};

export default AdminProductList;

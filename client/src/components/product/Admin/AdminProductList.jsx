import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, IconButton, TablePagination, TableContainer, Table, TableRow, TableCell, TableHead, TableBody } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct } from '../../../redux/productListReducer/actions';
import { DeleteForever, Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useStylesProductList } from './styles/AdminProductList';
import Swal from 'sweetalert2';

const columns = [
    {id: 'image', label: 'Image', minWidth: 100, maxWidth: 100},
    {id: 'id', label: 'ID', minWidth: 30, maxWidth: 30},
    {id: 'categories', label: 'Categories', minWidth: 30},
    {id: 'name', label: 'Name', minWidth: 60, maxWidth: 60},
    {id: 'price', label: 'Price', mindWidth: 30, maxWidth: 30},
    {id: 'stock', label: 'Stock', minWidth: 40, maxWidth: 40},
    {id: 'description', label: 'Description', minWidth: 100, maxWidth: 150},
    {id: 'rating', label: 'Rating', minWidth: 30, maxWidth: 30},
]

const AdminProductList = () => {
    const dispatch = useDispatch();
    const styles = useStylesProductList();
    const [ rows, setRows ] = useState([]);
    const products = useSelector(state => state.productListReducer.products);
    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(10);
    const userRole = sessionStorage.getItem('role');
    const token = sessionStorage.getItem('token');

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDelete = id => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: styles.confirmButton,
              cancelButton: styles.cancelButton
            },
            buttonsStyling: false
        });
    
        swalWithBootstrapButtons.fire({
            title: '¿Estas seguro?',
            text: "Esto no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'SI, ELIMINALE!',
            cancelButtonText: 'NO, CANCELAR!',
            reverseButtons: true
        })
        .then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                'Borrado!',
                'Tu producto ha sido eliminado',
                'success'
                );
                dispatch(deleteProduct(id, token));
                setRows(rows.filter(row => row.id !== id));
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                'Cancelado',
                `Tu produto ha sido eliminado`,
                'error'
                );
            };
        })
        .catch(err => console.log(err));
    };

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        setRows(products.map(row => { return {...row}}));
    }, [products]);

    const productList = () => {
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
                                                style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={`${row.code} ${row.id}`}>
                                                <TableCell key={`${columns[0].id} ${row.id}`} align={columns[0].align}>
                                                    <img src={row.image[0]} alt={row.name} className={styles.rowImage} />
                                                </TableCell>
                                                {columns.slice(1).map((column) => {
                                                    if (column.id === 'categories') {
                                                        return (
                                                            <TableCell key={`${column.id} ${row.id}`} align={column.align}>
                                                                {row.categories.map(el => `- ${el.name}\n`)}
                                                            </TableCell>
                                                        )
                                                    }
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={`${column.id} ${row.id}`} align={column.align}>
                                                            {column.format && typeof value === 'number' 
                                                            ? column.format(value) 
                                                            : column.id === 'featured' 
                                                            ? value.toString() 
                                                            : column.id === 'description'
                                                            ? `${value.slice(0, 15)}\n${value.slice(15, 30)}\n${value.slice(30, 45)}...`
                                                            : value
                                                            }
                                                        </TableCell>
                                                    );
                                                })}
                                                <TableCell  >
                                                    <Link to={{pathname:`/admin/products/${row.id}/edit`, state: row}} style={{cursor: 'pointer'}} >
                                                        <IconButton>
                                                            <Edit />
                                                        </IconButton>
                                                    </Link>
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
        )
    };

    return userRole === 'admin' ? productList() : '404 NOT FOUND';
};

export default AdminProductList;

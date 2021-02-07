import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, IconButton, TablePagination,
     TableContainer, Table, TableRow, TableCell, TableHead, TableBody } from '@material-ui/core';
import { DeleteForever} from '@material-ui/icons';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import {getUsers, deleteUsers, updateUserAdmin, updateUser} from '../../../redux/userListReducer/actions'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useStylesUserList } from './styles/AdminUserList';
import PersonIcon from '@material-ui/icons/Person';
import Swal from 'sweetalert2';


const columnUser = [
    {id: 'email', label: 'Email', minWidth: 55, maxWidth: 55},
    {id: 'first_name', label: 'First_name', minWidth: 45, maxWidth: 45},
    {id: 'last_name', label: 'Last_name', minWidth: 45, maxWidth: 45},
    {id: 'phone_number', label: 'Phone_number', minWidth: 40, maxWidth: 40},
    {id: 'user_role', label: 'User_role', mindWidth: 30, maxWidth: 30},
    {id: 'shipping_address', label: 'Shipping_address', minWidth: 60, maxWidth: 60},
    {id: 'billing_addres', label: 'Billing_addres', minWidth: 60, maxWidth: 60},
    {id: 'email_notification', label: 'Email_notification', minWidth: 60, maxWidth: 60},
]


function AdminUserList() {
    const dispatch = useDispatch();
    const styles = useStylesUserList();
    const [ rows, setRows ] = useState([]);
    const usuarios = useSelector(state=> state.userListReducer.users);

    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(10);

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
              confirmButton: styles.cancelButtonDelete,
              cancelButton: styles.confirmButtonDelete
            },
            buttonsStyling: false
        });
    
        swalWithBootstrapButtons.fire({
            title: 'Eliminar?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'YES, DELETE IT!',
            cancelButtonText: 'NO, CANCEL!',
            reverseButtons: true
        })
        .then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
                );
                dispatch(deleteUsers(id));
                setRows(rows.filter(row => row.id !== id));
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                'Cancelled',
                `Your product won't be deleted`,
                'error'
                );
            };
        })
        .catch(err => console.log(err));
    };

    const handleUpdateAdmin = id => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                cancelButton: styles.confirmButton,
                confirmButton: styles.cancelButton              
            },
            buttonsStyling: false
        });
    
        swalWithBootstrapButtons.fire({
            title: 'Convertir a Administrador',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'YES, CONVERTIR!',
            cancelButtonText: 'NO, CANCEL!',
            reverseButtons: true
        })
        .then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                'Cancelled',
                `Your product won't be update`,
                'error'
                );
            }else if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                'Convertido en Administrador!',
                'Your file has been updateado.',
                'success'
                );
                dispatch(updateUserAdmin(id));
                setRows(rows.filter(row => row.id !== id));
            } 
        })
        .catch(err => console.log(err));
    };

    const handleUpdateUser = id => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                cancelButton: styles.confirmButton,
                confirmButton: styles.cancelButton              
            },
            buttonsStyling: false
        });
    
        swalWithBootstrapButtons.fire({
            title: 'Convertir a Usuario',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'YES, CONVERTIR!',
            cancelButtonText: 'NO, CANCEL!',
            reverseButtons: true
        })
        .then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                'Cancelled',
                `Your product won't be update`,
                'error'
                );
            }else if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                'Convertido en Usuario!',
                'Your file has been updateado.',
                'success'
                );
                dispatch(updateUser(id));
                setRows(rows.filter(row => row.id !== id));
            } 
        })
        .catch(err => console.log(err));
    };


    useEffect(() => {
        dispatch(getUsers());
    }, []);

    useEffect(() => {
        setRows(usuarios.map(row => { return {...row}}));
    }, [usuarios]);

    return (
        <Container>
            <Typography variant='h3' align='center'>User List</Typography>
            <Container>
                <Grid container>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columnUser.map((colum)=>(
                                        <TableCell
                                        key={colum.id}
                                        align={colum.align}
                                        style={{ minWidth: colum.minWidth, maxWidth: colum.maxWidth }}
                                        >
                                        {colum.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map
                                (row =>{
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={`${row.code} ${row.id}`}>
                                            {columnUser.slice(0).map((colum)=>{
                                                const value = row[colum.id];
                                                return (
                                                    <TableCell key={`${colum.id} ${row.id}`} align={colum.align}>
                                                        {colum.format                                                         
                                                         ? `${value.slice(0, 15)}\n${value.slice(15, 30)}\n${value.slice(30, 45)}...`
                                                         : value
                                                        }
                                                    </TableCell>
                                                );
                                            })}
                                                <TableCell  >                                                    
                                                    <IconButton color='primary' onClick={() => handleUpdateAdmin(row.id)}>
                                                        < SupervisorAccountIcon />
                                                    </IconButton>                                                    
                                                </TableCell>

                                                <TableCell  >                                                    
                                                    <IconButton color='primary' onClick={() => handleUpdateUser(row.id)}>
                                                        < PersonIcon />
                                                    </IconButton>                                                    
                                                </TableCell>
                                                
                                                <TableCell>
                                                    <IconButton color='primary' onClick={() => handleDelete(row.id)} >
                                                        <DeleteForever />
                                                    </IconButton>
                                                </TableCell>                                            
                                        </TableRow>
                                    )
                                })
                                }
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
}

export default AdminUserList

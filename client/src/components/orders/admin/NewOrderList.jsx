import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrders, changeShippingStatus, cancelShipping, approveShipping,
         processingShipping } from '../../../redux/orderListReducer/actions';
import { Container, FormControl, InputLabel, Button, Backdrop, TextField, 
         Modal, Fade, IconButton, Tooltip, TablePagination, Table, TableBody, 
         TableCell, TableContainer, TableHead, TableRow, InputAdornment, 
         Typography, Select, MenuItem } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import SearchIcon from '@material-ui/icons/SearchRounded';
import Swal from 'sweetalert2';
import { useStylesOrderList } from './styles';

const showAlert = (message, time) => {
    return Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: time,
    });
};

const columns = [
    {
        id: 'id',
        label: 'ID',
        minWidth: 30,
        maxWidth: 35
    },
    {
        id: 'email',
        label: 'Usuario',
        minWidth: 30,
        maxWidth: 35
    },
    {
        id: 'status',
        label: 'Estado',
        minWidth: 50,
        maxWidth: 70
    },
    {
        id: 'shippingStatus',
        label: 'Estado del Envío',
        minWidth: 50,
        maxWidth: 70
    },
    {
        id: 'createdAt',
        label: 'Fecha',
        minWidth: 50,
        maxWidth: 70
    }
]

const NewOrderList = () => {
    const dispatch = useDispatch();
    const styles = useStylesOrderList();
    const orders = useSelector(state => state.orderListReducer.orderList);
    const userRole = sessionStorage.getItem('role');
    const [ orderList, setOrderList ] = useState([]);
    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(10);
    const [ statusChanged, setStatusChanged ] = useState(false);
    const [ reason, setReason ] = useState('');
    const [ open, setOpen ] = useState(false);
    const [ infoToSend, setInfoToSend ] = useState({});
    const [ filter, setFilter ] = useState('');
    const [ filterBy, setFilterBy ] = useState('');

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleChangeReason = e => {
        setReason(e.target.value);
    };

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangeShippingStatus = (id, status, userId) => {
        setStatusChanged(true);
        dispatch(changeShippingStatus(id, status));
        status === 'approved' && dispatch(approveShipping(id, userId));
        status === 'processing' && dispatch(processingShipping(id, userId));
    };

    const handleCancelShipStatus = (id, status, userId) => {
        handleOpen();
        setInfoToSend({ id, userId });
    };

    const handleSendReason = (e) => {
        e.preventDefault();
        setStatusChanged(true);
        handleClose();
        dispatch(changeShippingStatus(infoToSend.id, 'cancelled'));
        dispatch(cancelShipping(reason, infoToSend));
        showAlert('Orden cancelada!', 1500);
    };

    const handleFilter = e => {
        setFilter(e.target.value)
        if (filterBy) {
            setOrderList(orders.filter(order => order[filterBy].toString().includes(e.target.value)));
        } else {
            if (isNaN(filter)) {
                setOrderList(orders.filter(order => order.status.toLowerCase().includes(e.target.value)));
            } else {
                setOrderList(orders.filter(order => order.id.toString().includes(e.target.value)));
            }
        };
    };

    const handleChangeFilter = e => {
        setFilterBy(e.target.value);
    };

    useEffect(() => {
        dispatch(getOrders());
        if (statusChanged) {
            showAlert('¡El estado del envío ha sido cambiado!', 1500);
            setStatusChanged(false);
        };
    }, [dispatch, statusChanged]);

    useEffect(() => {
        setOrderList(orders);
        console.log(orders);
    }, [orders]);

    const searchBar = () => {
        return (
            <Container className={styles.searchBarContainer} >
                <FormControl variant="filled" className={styles.formControl}>
                    <InputLabel>Filter by</InputLabel>
                    <Select
                        labelId="filter-by"
                        id="filter-by"
                        value={filterBy}
                        onChange={handleChangeFilter}
                    >
                        <MenuItem value={'id'}>ID</MenuItem>
                        <MenuItem value={'status'}>Estado</MenuItem>
                        <MenuItem value={'email'}>Usuario</MenuItem>
                        <MenuItem value={'shippingStatus'}>Estado del envío</MenuItem>
                        <MenuItem value={'createdAt'}>Fecha</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    className={styles.searchBar}
                    name='search'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment disablePointerEvents >
                                <SearchIcon color='primary' />
                            </InputAdornment>
                        )
                    }}
                    variant='outlined'
                    placeholder='Filtrar por status...'
                    value={filter}
                    onChange={handleFilter}
                />
            </Container>
        )
    }
    
    const orderListTable = () => {
        return orderList.length > 0 ? (
            <Container>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    columns.map(column => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ maxWidth: column.maxWidth, minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                orderList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                    return (
                                        <TableRow key={row.id} >
                                            {
                                                columns.slice().map(column => {
                                                    const value = row[column.id];
    
                                                    if (column.id === 'id') {
                                                        return (
                                                            <TableCell key={`${column.id} ${row.id}`} align={column.align} >
                                                                <Link to={`/admin/orders/${row.id}`} >#{ value }</Link>
                                                            </TableCell>
                                                        )
                                                    } else if (column.id === 'createdAt') {
                                                        return (
                                                            <TableCell key={`${column.id} ${row.id}`} align={column.align} >
                                                                { value.split('T')[0] }
                                                            </TableCell>
                                                        )
                                                    }
    
                                                    return (
                                                        <TableCell key={`${column.id} ${row.id}`} align={column.align} >
                                                            { value }
                                                        </TableCell>
                                                    )
                                                })
                                            }
                                            {
                                                (row.shippingStatus === 'unitiated' && row.status === 'approved') && <TableCell>
                                                    <Tooltip title='Despachar' >
                                                        <IconButton onClick={() => handleChangeShippingStatus(row.id, 'processing', row.userId)} >
                                                            <LocalShippingIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            }
                                            {
                                                (row.shippingStatus === 'processing' && row.status === 'approved') && <TableCell>
                                                    <Tooltip title='Cancelar' >
                                                        <IconButton onClick={() => handleCancelShipStatus(row.id, 'cancelled', row.userId)} >
                                                            <CancelIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            }
                                            {
                                                (row.shippingStatus === 'processing' && row.status === 'approved') && <TableCell>
                                                    <Tooltip title='Completar' >
                                                        <IconButton onClick={() => handleChangeShippingStatus(row.id, 'approved', row.userId)} >
                                                            <CheckCircleIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            }
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
                    count={orderList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                <Modal
                        className={styles.modalContainer}  
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        disableAutoFocus
                        disableEnforceFocus
                        BackdropComponent={Backdrop}
                        BackdropProps={{timeout: 2000,}}
                    >
                        <Fade in={open} className={styles.fadeComponent} >
                            <Container>
                                <TextField
                                    multiline
                                    name='reason'
                                    label='Reason'
                                    value={reason}
                                    onChange={handleChangeReason}
                                />
                                <Button onClick={handleSendReason} className={styles.buttonConfirmAddress} >Enviar razón a cliente</Button>
                            </Container>
                        </Fade>
                    </Modal>
            </Container>
        )
        : <Typography variant='h5' align='center' className={styles.noResults} >NO HAY RESULTADOS PARA LA BÚSQUEDA</Typography>
    }

    const orderListComponent = () => {
        return (
            <Container>
                {searchBar()}
                <Container>
                    {orderListTable()}
                </Container>
            </Container>
        )
    }

    return userRole === 'admin' ? orderListComponent() : '404 not found';
}

export default NewOrderList;

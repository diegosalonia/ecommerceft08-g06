import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, IconButton, TablePagination,
     TableContainer, Table, TableRow, TableCell, TableHead, TableBody } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import { getCategory , deleteCategory} from '../../../redux/categoryListReducer/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useStylesCategoryList } from './styles/AdminCategoryList';
import Swal from 'sweetalert2';

const columnCategory = [
    {id: "image", label: 'Image', minWidth: 100, maxWidth: 100},
    {id: "name", label: 'Name', minWidth: 30, maxWidth: 30},
    {id: "description", label: 'Description', minWidth: 65, maxWidth: 65}
]

function AdminCategoryList(){
    const dispatch = useDispatch();
    const styles = useStylesCategoryList();
    const [ rows, setRows ] = useState([]); 
    const category = useSelector(state => state.categoryList.categories);
    const [ page, setPage ] = useState(0);  //paginacion
    const [ rowsPerPage, setRowsPerPage ] = useState(10);

    const userRole = sessionStorage.getItem('role');
    const token = sessionStorage.getItem('token')
    

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
            title: 'Esta Seguro?',
            text: "Esta decisión no tiene retorno!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'YES, DELETE IT!',
            cancelButtonText: 'NO, CANCEL!',
            reverseButtons: true
        })
        .then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                'Borrado!',
                'La categoria ha sido eliminada exitosamente',
                'success'
                );
                dispatch(deleteCategory(id,token));
                setRows(rows.filter(row => row.id !== id));
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                'Cancelada',
                `Tu accion ha sido cancelada`,
                'error'
                );
            };
        })
        .catch(err => console.log(err));
    };

    useEffect(()=>{
        dispatch(getCategory(token))
    },[dispatch,token])

    useEffect(() => {
        setRows(category.map(row => { return {...row}}));
    }, [category]);

    const categoryList = ()=>{
        return (
            <Container>
                <Typography variant='h3' align='center'>Category List</Typography>
                <Container>
                    <Grid container>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columnCategory.map((colum) =>(
                                            <TableCell key={`${colum.id}`}>{colum.label}</TableCell>                                            
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                                        row =>{
                                            return(
                                                <TableRow hover role="checkbox" tabIndex={-1} key={`${row.code} ${row.id}`}>
                                                    <TableCell key={`${row['id']}`} >                                                        
                                                        <img src={row.image} className={styles.rowImage} /> 
                                                    </TableCell>
                                                    {columnCategory.slice(1).map((column)=>{
                                                        const value = row[column.id]
                                                        return(
                                                            <TableCell key={`${column.id} ${row.id}`} align={column.align}>
                                                                {value}
                                                            </TableCell>
                                                        )
                                                    })}
                                                    <TableCell  >                                                    
                                                        <IconButton color='primary' onClick={()=>handleDelete(row.id)} >
                                                            < DeleteForever />
                                                        </IconButton>                                                    
                                                    </TableCell>

                                                </TableRow>
                                            )
                                        }
                                    )}
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
    return userRole === "admin" ? categoryList() : "404 NOT FOUND";
}

export default AdminCategoryList;
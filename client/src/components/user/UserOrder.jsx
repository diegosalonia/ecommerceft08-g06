import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Typography, Table, TableBody ,TableCell ,TableContainer, 
         TableHead, TableRow, Paper, TextField, Button } from '@material-ui/core';
import { getOrder } from '../../redux/orderReducer/actions';
import { changeShippingStatus, cancelShipping } from '../../redux/orderListReducer/actions';
import { useStyles } from './styles/';
import Swal from 'sweetalert2';

export default function Order(props){
  const classes = useStyles()
    const { orderId } = props.match.params
    const [input, setInput] = useState("")
    const [change, setChange] = useState(false)
    const order = useSelector(state => state.orderReducer.order)
    const products = useSelector(state => state.orderReducer.products)
    const status = useSelector(state => state.orderReducer.status)
    const date = useSelector(state => state.orderReducer.order.createdAt)
    const dispatch = useDispatch()

    const rows = products || order.products;

    const total = (array) => {
        let result = 0;
        array.forEach(element =>{
            result += element.price * element.order_line.quantity
        })
        return result
    }

    useEffect(() => {      
       dispatch(getOrder(orderId))  
    },[orderId]);

    const handleChange = (event) => {
      setInput(event.target.value)
    }

    const handleCancelOrder = () => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: classes.confirmButton,
          cancelButton: classes.cancelButton
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: '¿Estas seguro?',
        text: "Esto no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'SI, CANCELAR ORDEN!',
        cancelButtonText: 'NO CANCELAR!',
        reverseButtons: true
    })
    .then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
            'Hecho!',
            'Tu orden ha sido cancelada',
            'success'
            );
            dispatch(changeShippingStatus(orderId, 'cancelled'));
            dispatch(cancelShipping('Orden cancelada por usuario', {id: order.id, userId: order.userId}));
            window.location.reload(false);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
            'Cancelado',
            `Tu orden no se ha cancelado`,
            'error'
            );
        };
    })
    .catch(err => console.log(err));

    };

    return(
        <Container className={classes.container}>
        <div className={classes.container}>
            <Container className={classes.containers}>
                <TableContainer component={Paper} className={classes.paper}>
                  <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                              <TableCell className={classes.title}>
                                 <Typography variant="h4">Orden # {orderId}</Typography>
                              </TableCell>                       
                              <TableCell align="left" className={classes.title}>{order.user?.email}</TableCell>
                              <TableCell align="left" className={classes.title}>Fecha:</TableCell>
                              <TableCell align="left" className={classes.title}>{date?.slice(0,10)}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow className={classes.row}>
                        <TableCell className={classes.cellname}>Producto</TableCell>
                        <TableCell align="left" className={classes.cellname}>Cantidad</TableCell>
                        <TableCell align="left" className={classes.cellname}>Precio</TableCell>
                        <TableCell align="left" className={classes.cellname}>Subtotal</TableCell>
                      </TableRow>
                      {rows&&rows.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row" className={classes.cell}><Link className={classes.link} to={`/products/${row.id}`} >{row.name}</Link></TableCell>
                          <TableCell align="left" className={classes.cell}>{row.order_line.quantity}</TableCell>
                          <TableCell align="left" className={classes.cell}>{row.price}</TableCell>
                          <TableCell align="left" className={classes.cell}>{row.price * row.order_line.quantity}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                          <TableCell align="left" rowSpan={3} className={classes.cell}></TableCell>
                          <TableCell align="left" colSpan={2} className={classes.cell}>Total</TableCell>
                          <TableCell align="left" className={classes.cell}>{rows&&total(rows)}</TableCell>
                      </TableRow>
                      <TableRow>
                          <TableCell align="left" colSpan={0} className={classes.cell}>Estado del envío</TableCell>
                          <TableCell align="left" colSpan={0} className={classes.cell} ></TableCell>
                          <TableCell align="left" colSpan={0} className={classes.cell}>{order.shippingStatus}</TableCell>
                      </TableRow>
                      <TableRow>
                          <TableCell align="left" colSpan={0} className={classes.cell}>Estado</TableCell>
                          <TableCell align="left" colSpan={0} className={classes.cell} ></TableCell>
                          <TableCell align="left" colSpan={0} className={classes.cell}>{order.status}</TableCell>
                      </TableRow>
                      {(order.shippingStatus !== 'cancelled' && order.shippingStatus !== 'approved') && <TableRow>
                        <TableCell align="left" colSpan={0} className={classes.cell} ></TableCell>
                        <TableCell align="left" colSpan={0} className={classes.cell} ></TableCell>
                        <TableCell align="left" size='small' colSpan={0} variant='footer' className={classes.cell}>
                          <Button onClick={handleCancelOrder} className={classes.cancelOrderButton} >Cancelar Compra</Button>
                        </TableCell>
                      </TableRow>}
                    </TableBody>
                  </Table>
                </TableContainer>
            </Container>
        </div>
        </Container>
        
    )
}
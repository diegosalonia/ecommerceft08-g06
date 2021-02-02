import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Typography, Table, TableBody ,TableCell ,TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { getOrder } from '../../../redux/orderReducer/actions';
import useStyles from './styles/styles'

export default function Order(props){
  const classes = useStyles()
    const { userId, orderId } = props.match.params
    const products = useSelector(state => state.orderReducer.products)
    const date = useSelector(state => state.orderReducer.products[0]?.order_line.createdAt)
    const dispatch = useDispatch()

    const rows = [...products];


    const total = (array) => {
        let result = 0;
        array.forEach(element =>{
            result += element.price * element.order_line.quantity
        })
        return result
    }

    useEffect(() => {      
       dispatch(getOrder(userId, orderId))  
    },[])

    return(
        <Container className={classes.container}>
        <div className={classes.container}>
            <Container className={classes.containers}>
                <TableContainer component={Paper} className={classes.paper}>
                  <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                              <TableCell className={classes.title}>
                                 <Typography variant="h4">Order # {orderId}</Typography>
                              </TableCell>                       
                              <TableCell align="left" className={classes.title}></TableCell>
                              <TableCell align="left" className={classes.title}>Date:</TableCell>
                              <TableCell align="left" className={classes.title}>{date?.slice(0,10)}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow className={classes.row}>
                        <TableCell className={classes.cellname}>Product</TableCell>
                        <TableCell align="left" className={classes.cellname}>Quantity</TableCell>
                        <TableCell align="left" className={classes.cellname}>Price</TableCell>
                        <TableCell align="left" className={classes.cellname}>Subtotal</TableCell>
                      </TableRow>
                      {rows.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row" className={classes.cell}>{row.name}</TableCell>
                          <TableCell align="left" className={classes.cell}>{row.order_line.quantity}</TableCell>
                          <TableCell align="left" className={classes.cell}>{row.price}</TableCell>
                          <TableCell align="left" className={classes.cell}>{row.price * row.order_line.quantity}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                          <TableCell align="left" rowSpan={3} className={classes.cell}></TableCell>
                          <TableCell align="left" colSpan={2} className={classes.cell}>Total</TableCell>
                          <TableCell align="left" className={classes.cell}>{total(rows)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
            </Container>
        </div>
        </Container>
        
    )
}
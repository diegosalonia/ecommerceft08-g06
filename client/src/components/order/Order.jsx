import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { Container, Grid, Typography, Table, TableBody ,TableCell ,TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { getOrder } from '../../redux/orderReducer/actions';

export default function Order(props){
    const { userId, orderId } = props.match.params
    const products = useSelector(state => state.orderReducer.products)
    const date = useSelector(state => state.orderReducer.products[0]?.order_line.createdAt)
    const dispatch = useDispatch()

    const rows = [...products];
    console.log("products", products)

    const useStyles = makeStyles(theme =>({
        containers:{
            display:"flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop:"20px",
            minWidth: 800,
            borderRadius: "5px"
        },
        container:{
            display:"flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop:"20px",
            minWidth: 800,
        },
        table: {
            minWidth: "100%",
            // minHeight: 300
        },
        cellname:{
            padding: theme.spacing(1, 1, 1, 2),
            // backgroundColor: theme.palette.secondary.light
        },
        cell:{
            padding: theme.spacing(2, 1, 2, 2),
            // backgroundColor: theme.palette.primary.light
        },
        title:{
            padding: theme.spacing(2, 1, 2, 2),
            backgroundColor: theme.palette.primary.light
        },
        paper:{
            boxShadow: "1px 5px 5px rgba(0,0,0,0.5)"
        }
    }))
    const classes = useStyles()

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
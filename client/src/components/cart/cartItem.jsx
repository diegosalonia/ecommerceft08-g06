import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Button,
  Container,
  Typography,
  TableCell,
  Grid,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TextField
} from "@material-ui/core";
import { getCart } from "../../redux/cartReducer/actions";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";


export default function CartItem (props){
  
  const {idUser, orderId} = props.match.params;
  const order = useSelector(state => state.cartReducer.producList)
  const dispatch = useDispatch();

  const rows = [...order];
  console.log("OJALA QUE HAYA ALGO AQUI", order)

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
    },
    title: {},
    listProducts: {
      display: "flex",
    },
    products: {
      marginRight: "100px",
    },
    heightfile: {
        padding: theme.spacing(5, 2, 5, 0),
    },
    quantity: {
        width: 40,
        textAlign: "center",
    },

  }));

  const productos = [
    {
      id: 1,
      name: "GROW MIX MULTIPRO 80 L TERRAFERTIL",
      quantity: 40,
      price: 40000,
    },
    {
      id: 2,
      name: "GROW MIX MULTIPRO 80 L TERRAFERTIL",
      quantity: 40,
      price: 40000,
    },
    {
      id: 3,
      name: "GROW MIX MULTIPRO 80 L",
      quantity: 40,
      price: 40000,
    },
  ];

  const columns = [
    {id: 'image', label: 'Image', minWidth: 100},
    {id: 'name', label: 'Name', minWidth: 60 },
    {id: 'quantity', label: 'Quantity', minWidth: 30 },
    {id: 'price', label: 'Price', mindWidth: 30 },
  ]

  const classes = useStyles();

  const total = (array) => {
    let result = 0;
    array.forEach(element =>{
        result += element.price * element.quantity
    })
    return result
  }

  useEffect(()=>{
    dispatch(getCart(idUser,orderId))
  },[])

  return (
    <Container fullwidth className={classes.container}>
      <Container className={classes.container}>
        <Typography variant="h4">Cart</Typography>
        <Grid align="left" className={classes.title}>
          <TableContainer>
            <TableHead>
                <TableRow>
                    {columns.map((rows)=>
                        <TableCell
                        key={rows.id}
                        style={{ minWidth: rows.minWidth }}
                        >{rows.label}
                        </TableCell>
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
              {productos?.map((product) => (
                <TableRow key={product.id} >
                    <TableCell  className= {classes.heightfile}></TableCell>
                    <TableCell className= {classes.heightfile}>{product.name}</TableCell>
                    <TableCell align="center" className= {classes.heightfile}>
                        <TextField
                        type= 'number'
                        inputProps={{min: 0, style: { textAlign: 'center' }}}
                        className= {classes.quantity}
                        defaultValue={product.quantity}/>                           
                    </TableCell>
                    <TableCell align="right" className= {classes.heightfile}>{product.price}</TableCell>
                </TableRow>
              ))}
                <TableRow>
                    <TableCell rowSpan={3}/>
                    <TableCell colSpan={2} align="center">Subtotal</TableCell>
                    <TableCell align="right">{total(productos)}</TableCell>
                </TableRow>
                 <TableRow>
                    <TableCell colSpan={2} align="center">Envio</TableCell>
                    <TableCell align="right">Gratis</TableCell> 
                 </TableRow>
                <TableRow>
                    <TableCell colSpan={2} align="center">Total</TableCell>
                    <TableCell align="right">{total(productos)}</TableCell> 
                 </TableRow>
            </TableBody>
          </TableContainer>
        </Grid>
       </Container>
    </Container>
  );
};
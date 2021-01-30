import React, { useState } from "react";
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
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
//import { useStyles } from '../styles';
//import { removeProductToCart, incrementCartItem, decrementCartItem } from '../redux/CartReducer/actions.js';
//import { Product } from '../product/product.jsx';

const CartItem = () => {
  const [itemQuantity, setItemQuantity] = useState();
  // const product = useSelector(state => state.cartReducer.productList);
  // const dispatch = useDispatch();
  // const removeItem = () => {
  //     dispatch(removeProductToCart(id));
  // };

  // const incOrDecItem = (e, type) => {
  //     const value = itemQuantity;

  //     if(type === incrementCartItem && value <= Product.props.stock) {
  //         setItemQuantity(itemQuantity + 1);
  //         distpach(incrementCartItem(id));
  //     }

  //     if(type === decrementCartItem && value > 1) {
  //         setItemQuantity(itemQuantity - 1);
  //         // distpach(decrementCartItem(id));
  //     }
  // };

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

export default CartItem;

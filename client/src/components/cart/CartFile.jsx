import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
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
import { getCart , changeQuantityCartProduct , removeProductToCart , removeAllProductToCart } from "../../redux/CartReducer/actions";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";



const CartFile = ({ product, handleChange, handleDelete, idUser, orderId }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(product.order_line.quantity)
    
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
        images:{
            width: 70,
            textAlign: "center",
        }
    
      }));
      const classes = useStyles();

  const Formik = useFormik({
      initialValues: {
          cantidad: product.order_line.quantity
      }
  })
     
   useEffect (() => {
     console.log('esta es la cantidad: ', quantity)
     setQuantity(Formik.values.cantidad)

   }, [Formik.values.cantidad])  
  

return (
  <TableRow key={product.id}>
    <TableCell className={classes.heightfile}>
      <img src={product.image} className={classes.images} />
    </TableCell>
    <TableCell className={classes.heightfile}>{product.name}</TableCell>

    <TableCell align="center" className={classes.heightfile}>
      <TextField
        type="number"
        inputProps={{ min: 0, style: { textAlign: "center" } }}
        className={classes.quantity}
        //defaultValue={product.order_line.quantity}
        value={Formik.values.cantidad}
        name="cantidad"
        onChange={Formik.handleChange}
      />
    </TableCell>

    <TableCell align="right" className={classes.heightfile}>
      {product.price}
    </TableCell>

    <TableCell align="center" className={classes.heightfile}>
      <Button
        variant="contained"
        color="primary"
        name="deleteOne"
        onClick={() => handleDelete(product.id, idUser, orderId)}
      >
        X
      </Button>
    </TableCell>
  </TableRow>
)
};

export default CartFile;

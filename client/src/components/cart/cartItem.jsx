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
import { Redirect } from "react-router-dom" 


export default function CartItem (props){

  const {idUser, orderId} = props;
  const dispatch = useDispatch();
  const [ deletes, setDeletes ] = useState(false)
  
  
  const order = useSelector(state => state.cartReducer.producList)
  const rowset = [...order]
  console.log(rowset)
  const quantitys = 0
  const [cantidad, setCatidad] = useState()

  function handleChange(e){
    setCatidad(e.target.value)
    dispatch(changeQuantityCartProduct({id:1, quantity:e.target.value},idUser,orderId))
  }
  
  function handleDelete(idProduct, idUser, idOrder){
    dispatch(removeProductToCart({id: idProduct},idUser,idOrder))
    setDeletes(true)
  }

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
        result += element.price * element.order_line.quantity
    })
    return result
  }

  useEffect(()=>{
    if(idUser && orderId){
      dispatch(getCart(idUser,orderId))
    }
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
              {rowset?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell  className= {classes.heightfile}>
                      <img src={product.image} className={classes.images}/>
                    </TableCell>
                    <TableCell className= {classes.heightfile}>{product.name}</TableCell>

                    <TableCell align="center" className= {classes.heightfile}>
                        <TextField
                        type= 'number'
                        inputProps={{min: 0, style: { textAlign: 'center' }}}
                        className= {classes.quantity}
                        defaultValue={product.order_line.quantity}                        
                        name="cantidad"
                        onChange={handleChange}
                        //onClick={()=>dispatch(changeQuantityCartProduct({id:product.id, quantity:60},idUser,orderId))}
                        />                           
                    </TableCell>

                    <TableCell align="right" className= {classes.heightfile}>{product.price}</TableCell>

                    <TableCell align="center" className= {classes.heightfile}>
                      <Button 
                        variant="contained" 
                        color="primary"
                        name="deleteOne"
                        onClick={() => handleDelete(product.id, idUser, orderId)}
                        //onClick={()=>dispatch(removeProductToCart({id:product.id},idUser,orderId))}
                        >
                        X
                      </Button>
                    </TableCell>
                </TableRow>
              ))}
                <TableRow>
                    <TableCell rowSpan={3}/>
                    <TableCell colSpan={2} align="center">Subtotal</TableCell>
                    <TableCell align="right">{total(rowset)}</TableCell>
                </TableRow>
                 <TableRow>
                    <TableCell colSpan={2} align="center">Envio</TableCell>
                    <TableCell align="right">Gratis</TableCell> 
                 </TableRow>
                <TableRow>
                    <TableCell colSpan={2} align="center">Total</TableCell>
                    <TableCell align="right">{total(rowset)}</TableCell> 
                 </TableRow>
            </TableBody>
          </TableContainer>
        </Grid>
       </Container>
    </Container>
  );
};
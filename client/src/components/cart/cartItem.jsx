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
import { getCart } from "../../redux/CartReducer/actions";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";


export default function CartItem (props){

  const {idUser, orderId} = props;
  const dispatch = useDispatch();
  
  // const [OrderL, setOrder] = useState([])
  const order = useSelector(state => state.cartReducer.producList)
  const rowset = [...order]
  

  console.log("OJALA QUE HAYA ALGO AQUIz", order)
  // if(Array.isArray(order)){
  //   const rowset = [...order]
  //   console.log("OJALA QUE HAYA ALGO AQUIz", rowset)
  // }
  

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
                        defaultValue={product.order_line.quantity}/>                           
                    </TableCell>
                    <TableCell align="right" className= {classes.heightfile}>{product.price}</TableCell>
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

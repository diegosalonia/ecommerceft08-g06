import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Table, TableBody ,TableCell ,TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@material-ui/core';
import { getOrder, changeStatus } from '../../../redux/orderReducer/actions';
import useStyles from './styles/styles'

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

    const handleSubmit = () => {
      dispatch(changeStatus(orderId, input))
      setInput("")
      setChange(false)
    }

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
                      {rows&&rows.map((row) => (
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
                          <TableCell align="left" className={classes.cell}>{rows&&total(rows)}</TableCell>
                      </TableRow>
                      <TableRow>
                          <TableCell align="left" colSpan={0} className={classes.cell}>Status</TableCell>
                          <TableCell align="left" rowSpan={0} className={classes.cell}>{
                          !change?
                          <Typography>
                            {status.toUpperCase()}
                          </Typography>:
                          <TextField
                          id="status"
                          name="status"
                          className={classes.input}
                          value={input}
                          onChange={handleChange}
                          />
                          }
                          </TableCell>
                          <TableCell align="left" className={classes.cell}>
                            {
                              !change?
                              <Button variant="outlined" size="small" onClick={()=>setChange(true)}>Edit</Button>:
                              <Button variant="outlined" size="small" onClick={handleSubmit}>Submit</Button>
                            }
                          </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
            </Container>
        </div>
        </Container>
        
    )
}
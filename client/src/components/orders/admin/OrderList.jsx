import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import {Link, Typography} from '@material-ui/core'
import { getOrders } from '../../../redux/orderListReducer/actions';


const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orderListReducer.orderList);
  const [ orderList, setOrderList ] = useState([]);
  const userRole = sessionStorage.getItem('role');

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    setOrderList(orders);
  }, [orders]);

const columns = [
    { field: 'id', headerName: 'Pedido', flex: 0.5, renderCell: (params) => <Link href={`orders/${params.row.id}`}>#{params.row.id} {params.row.userId}</Link>  },
    { field: 'status', headerName: 'Estado', flex: 0.75 },
    {
      field: 'createdAt',
      headerName: 'Fecha',
      type: 'dateTime',
      flex: 1,
    },
  ];

  const orderListComponent = () => {
    return (
        <div style={{ height: 480, width: '90%', margin: 'auto' }}>
          <Typography>Order List</Typography>
          <DataGrid
            checkboxSelection
            onSelectionChange={(newSelection) => {
                console.log(newSelection.rowIds); //ToDo something with this. 
              }}
            columns={columns}
            rows={orderList}
          />
        </div>
    )
  }

    return userRole === 'admin' ? orderListComponent() : '404 NOT FOUND';
}

export default OrderList;

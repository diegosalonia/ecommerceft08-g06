import axios from 'axios';
import { GET_ORDERS } from '../constants';

export const getOrders = () => dispatch => {
    return axios.get('http://localhost:3000/orders')
    .then(orders => {
        dispatch({
            type: GET_ORDERS,
            orders: orders.data
        });
    })
    .catch(err => console.log(err));
};

export const changeShippingStatus = (orderId, shippingStatus) => dispatch => {
    return axios.put(`http://localhost:3000/orders/${orderId}/${shippingStatus}`)
    .then(res => {
        console.log("NEW ORDER SHIPPINGSTATUS: ", res.data);
    })
    .catch(err => console.log("ERROR WHILE CHANGING SSTATUS: ", err));
};

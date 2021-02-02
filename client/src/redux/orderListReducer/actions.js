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

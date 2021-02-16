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

export const cancelShipping = (reason, infoToSend) => dispatch => {
    console.log("REASON: ", reason);
    changeShippingStatus(infoToSend.id, 'cancelled');
    return axios.post('http://localhost:3000/orders/reject-shipping', { reason, infoToSend })
    .then (res => {
        console.log("MAIL SENDED: ", res.data);
        axios.get(`http://localhost:3000/users/${infoToSend.userId}/${infoToSend.id}`)
        .then(res => {
            const products = res.data;
            products.forEach(product => {
                axios.put(`http://localhost:3000/products/${product.id}`, { form: {...product, stock: product.stock + product.order_line.quantity}})
                .then(res => console.log("PRODUCTO ACTUALIZADO: ", product))
                .catch(err => console.log("ERROR ACTUALIZANDO PRODUCTO: ", err));
            })
        })
    })
    .catch(err => console.log("ERROR TRYING TO SEND MAIL CANCEL: ", err));
};

export const approveShipping = (id, userId) => dispatch => {
    return axios.post('http://localhost:3000/orders/approve-shipping', { id, userId })
    .then (res => console.log("MAIL SENDED: ", res.data))
    .catch(err => console.log("ERROR TRYING TO SEND MAIL APPROVE: ", err));
};

export const processingShipping = (id, userId) => dispatch => {
    return axios.post('http://localhost:3000/orders/processing-shipping', { id, userId })
    .then(res => console.log("MAIL SENDED: ", res.data))
    .catch(err => console.log("ERROR TRYING TO SEND MAIL REJECT: ", err));
}

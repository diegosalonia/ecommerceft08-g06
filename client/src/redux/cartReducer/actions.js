import axios from 'axios';
import { GET_PRODUCTS_IN_CART, CHANGE_PRODUCT_QUANTITY, 
         DELETE_PRODUCT_FROM_CART, DELETE_ALL_CART, 
         GO_TO_CHECKOUT } from '../constants';

export const getProductsInCart = id => dispatch => {
    return axios.get(`http://localhost:3000/users/${id}/cart`)
    .then(products => {
        dispatch({
            type: GET_PRODUCTS_IN_CART,
            products: products.data
        });
    })
    .catch(err => console.log(err));
};

export const changeProductQuantity = (userId, product) => dispatch => {
    const { id, quantity } = product;
    return axios.put(`http://localhost:3000/users/${userId}/cart`, {product: {id, quantity}})
    .then(res => {
        dispatch({
            type: CHANGE_PRODUCT_QUANTITY,
            product: {
                id,
                quantity: res.data
            }
        });
    });
};

export const deleteProductInCart = (userId, productId) => dispatch => {
    return axios.delete(`http://localhost:3000/users/${userId}/cart/${productId}`)
    .then(res => {
        dispatch({
            type: DELETE_PRODUCT_FROM_CART,
            productId
        });
    })
    .catch(err => console.log(err));
};

export const deleteAllCart = userId => dispatch => {
    return axios.delete(`http://localhost:3000/users/${userId}/cart`)
    .then(res => {
        dispatch({
            type: DELETE_ALL_CART
        });
    });
};

export const goToCheckout = (userId, products) => dispatch => {
    return axios.post(`http://localhost:3000/users/${userId}/checkout`, products)
    .then(res => {
        dispatch({
            type: GO_TO_CHECKOUT,
            res: res.data
        });
    })
    .catch(err => console.log(err));
};

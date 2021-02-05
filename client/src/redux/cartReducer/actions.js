import axios from 'axios';
import { GET_PRODUCTS_IN_CART, CHANGE_PRODUCT_QUANTITY, 
         DELETE_PRODUCT_FROM_CART, DELETE_ALL_CART, 
         GO_TO_CHECKOUT, CHANGE_ORDER_STATUS } from '../constants';

export const getProductsInCart = userId => dispatch => {
    return axios.get(`http://localhost:3000/users/${userId}/cart`)
    .then(products => {
        dispatch({
            type: GET_PRODUCTS_IN_CART,
            products: products.data
        });
        localStorage.setItem('cart', JSON.stringify(products.data));
    })
    .catch(err => console.log(err));
};

export const changeProductQuantity = (userId, product) => (dispatch, getState) => {
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
        const cartWithQuantityChanged = getState().cartReducer.productsInCart.map(el => {
            if (el.id === product.id) {
                el.order_line.quantity = product.quantity;
            };
            return el;
        });
        localStorage.setItem('cart', JSON.stringify(cartWithQuantityChanged));
    })
    .catch(err => console.log(err));
};

export const deleteProductInCart = (userId, productId) => (dispatch, getState) => {
    return axios.delete(`http://localhost:3000/users/${userId}/cart/${productId}`)
    .then(res => {
        dispatch({
            type: DELETE_PRODUCT_FROM_CART,
            productId
        });
        const cartWithoutItem = getState().cartReducer.productsInCart.filter(el => el.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cartWithoutItem));
    })
    .catch(err => console.log(err));
};

export const deleteAllCart = userId => dispatch => {
    return axios.delete(`http://localhost:3000/users/${userId}/cart`)
    .then(res => {
        dispatch({
            type: DELETE_ALL_CART
        });
        localStorage.removeItem('cart');
    });
};

export const goToCheckout = (userId, products) => dispatch => {
    return axios.post(`http://localhost:3000/checkout/${userId}`, { products })
    .then(res => {
        console.log("RESPUESTA ACTIONS: ", res.data);
        dispatch({
            type: GO_TO_CHECKOUT,
            res: res.data
        });
        window.location = res.data.init_point;
    })
    .catch(err => console.log(err));
};

export const changeOrderStatus = userId => dispatch => {
    const url = window.location.href.slice(window.location.href.indexOf('?'));
    const status = url.slice(url.indexOf('&status') + 1).split('=')[1].split('&')[0];
    return axios.put(`http://localhost:3000/checkout/${userId}`, {status})
    .then(res => {
        dispatch({
            type: CHANGE_ORDER_STATUS,
            order: res.data
        });
        window.location.search = window.location.search.split('?')[0];
        localStorage.removeItem('cart');
    })
    .catch(err => console.log(err));
};
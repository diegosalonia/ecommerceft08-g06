import axios from 'axios';
import { GET_PRODUCTS_IN_CART, CHANGE_PRODUCT_QUANTITY, 
         DELETE_PRODUCT_FROM_CART, DELETE_ALL_CART, 
         GO_TO_CHECKOUT, CHANGE_ORDER_STATUS,
         CHANGE_PRODUCT_QUANTITY_NO_USER, SEND_ORDER_EMAIL } from '../constants';

export const getProductsInCart = userId => dispatch => {
    if (!userId) {
        return;
    };
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
    if (!userId) {
        const productsInCart = JSON.parse(localStorage.getItem('cart'));
        productsInCart.forEach(product => {
            if (product.id === id) {
                product.quantity = quantity;
            };
        });
        localStorage.setItem('cart', JSON.stringify(productsInCart));
        dispatch({
            type: CHANGE_PRODUCT_QUANTITY_NO_USER,
            product: {
                id,
                quantity,
            }
        });
        return;
    };
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
    if(!userId) {
        const productsInCart = JSON.parse(localStorage.getItem('cart'));
        localStorage.setItem('cart', JSON.stringify(productsInCart.filter(product => product.id !== productId)));
        dispatch({
            type: DELETE_PRODUCT_FROM_CART,
            productId
        });
        return;
    }
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
    if (!userId) {
        localStorage.removeItem('cart');
        dispatch({
            type: DELETE_ALL_CART
        });
        return;
    };
    return axios.delete(`http://localhost:3000/users/${userId}/cart`)
    .then(res => {
        dispatch({
            type: DELETE_ALL_CART
        });
        localStorage.removeItem('cart');
    })
    .catch(err => console.log(err));
};

export const goToCheckout = (userId, products) => dispatch => {
    return axios.post(`http://localhost:3000/checkout/${userId}`, { products })
    .then(res => {
        dispatch({
            type: GO_TO_CHECKOUT,
            res: res.data
        });
        window.location = res.data.init_point;
    })
    .catch(err => console.log(err));
};

export const changeOrderStatus = userId => (dispatch, getState) => {
    const url = window.location.href.slice(window.location.href.indexOf('?'));
    const status = url.slice(url.indexOf('&status') + 1).split('=')[1].split('&')[0];
    if (status === 'approved') {
        const products = JSON.parse(localStorage.getItem('cart'));
        axios.post('http://localhost:3000/users/send-order', {order: products, userId})
        .then(res => {
            dispatch({
                type: SEND_ORDER_EMAIL,
                order: res.data
            });
        })
        .catch(err => console.log("ERROR ENVIANDO MAIL: ", err));

        const promises = products.map(product => {
            return axios.put(`http://localhost:3000/products/${product.id}`, {form: {...product, stock: product.stock - product.order_line.quantity}})
            .then(res => console.log(res))
            .catch(err => console.log(err));
        });

        Promise.all(promises)
        .then(res => {
            return axios.put(`http://localhost:3000/checkout/${userId}`, {status})
            .then(response => {
                dispatch({
                    type: CHANGE_ORDER_STATUS,
                    order: response.data
                });
                // window.location.search = window.location.search.split('?')[0];
                localStorage.removeItem('cart');
            })
        })
        .catch(err => console.log('SE PUDRIÓ TODO'));
    } else {
        return axios.put(`http://localhost:3000/checkout/${userId}`, {status})
        .then(res => {
        dispatch({
            type: CHANGE_ORDER_STATUS,
            order: res.data
        });
        // window.location.search = window.location.search.split('?')[0];
        localStorage.removeItem('cart');
        })
        .catch(err => console.log(err));
    };
};

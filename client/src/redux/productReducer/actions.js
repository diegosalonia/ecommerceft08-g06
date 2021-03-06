import axios from 'axios';
import { GET_PRODUCT, GET_PRODUCT_ERROR, SHOW_LOADER, HIDE_LOADER, ADD_PRODUCT_TO_CART } from '../constants';

export const showLoader = () => dispatch => {
    dispatch({
        type: SHOW_LOADER
    });
};

export const getProduct = id => (dispatch) => {
    return axios.get(`http://localhost:3000/products/product-detail/${id}`)
    .then(product => {
        dispatch({
            type: GET_PRODUCT,
            product: product.data
        });
    })
    .catch(err => console.log(err));
};

export const hideLoader = () => dispatch => {
    dispatch({
        type: HIDE_LOADER
    });
};

export const addToCart = (userId = 1, id, quantity = 1) => dispatch => {
    return axios.post(`http://localhost:3000/users/${userId}/cart`, { product: {id, quantity}})
    .then(response => {
        dispatch({
            type: ADD_PRODUCT_TO_CART,
            id
        });
    })
    .catch(err => console.log(err));
};

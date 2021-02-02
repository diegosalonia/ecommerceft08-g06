import axios from 'axios';
import { GET_PRODUCTS_IN_CART } from '../constants';

export const getProductsInCart = id => dispatch => {
    return axios.get(`´http://localhost:3000/users/${id}/cart`)
    .then(products => {
        dispatch({
            type: GET_PRODUCTS_IN_CART,
            products: products.data
        });
    })
    .catch(err => console.log(err));
};

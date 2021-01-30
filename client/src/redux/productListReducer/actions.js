import axios from 'axios';
import { GET_PRODUCTS } from '../constants';

export const getProducts = () => dispatch => {
    return axios.get('http://localhost:3000/products')
    .then(products => {
        dispatch({
            type: GET_PRODUCTS,
            products: products.data
        });
    })
    .catch(err => console.log(err));
};

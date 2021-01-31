import axios from 'axios';
import { GET_PRODUCTS, DELETE_PRODUCT } from '../constants';

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

export const deleteProduct = id => dispatch => {
    return axios.delete(`http://localhost:3000/products/${id}`)
    .then(res => {
        dispatch({
            type: DELETE_PRODUCT,
        });
    })
    .catch(err => console.log('ERROR DELETE: ', err));
}

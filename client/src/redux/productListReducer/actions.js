import axios from 'axios';
import { GET_PRODUCTS, DELETE_PRODUCT, config } from '../constants';

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

export const deleteProduct = (id, token) => dispatch => {
    return axios.delete(`http://localhost:3000/products/${id}`, config(token))
    .then(res => {
        dispatch({
            type: DELETE_PRODUCT,
        });
    })
    .catch(err => console.log('ERROR DELETE: ', err));
}

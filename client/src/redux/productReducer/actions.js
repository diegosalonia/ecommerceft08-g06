import axios from 'axios';
import { GET_PRODUCT, GET_PRODUCT_ERROR } from '../constants';

export const getProduct = id => (dispatch) => {
    return axios.get(`http://localhost:3000/products/${id}`)
    .then(product => {
        console.log("PRODUCTO ACTION: ", product.data);
        dispatch({
            type: GET_PRODUCT,
            product: product.data
        });
    })
    .catch(err => console.log(err))
};
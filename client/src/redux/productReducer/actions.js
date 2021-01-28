import axios from 'axios';
import { GET_PRODUCT, GET_PRODUCT_ERROR, SHOW_LOADER, HIDE_LOADER } from '../constants';

export const showLoader = () => dispatch => {
    dispatch({
        type: SHOW_LOADER
    });
};

export const getProduct = id => (dispatch) => {
    return axios.get(`http://localhost:3000/products/${id}`)
    .then(product => {
        console.log("PRODUCTO ACTION: ", product.data);
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

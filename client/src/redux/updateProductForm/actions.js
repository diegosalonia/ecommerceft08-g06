import axios from "axios"
import { GET_PRODUCT, GET_CATEGORIES } from '../constants';

export const getProduct = id => dispatch => {
    console.log("ANTES DEL AXIOS");
    return axios.get(`http://localhost:3000/products/${id}`)
    .then(product => {
        dispatch({
            type: GET_PRODUCT,
            product: product.data
        });
    })
    .catch(err => console.log(err));
};

export const getCategories = () => dispatch => {
    axios.get('http://localhost:3000/category/all')
    .then(categories => {
        dispatch({
            type: GET_CATEGORIES,
            categories: categories.data
        });
    })
    .catch(error => console.log(error));
};

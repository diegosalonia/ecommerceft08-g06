import { GET_PRODUCTS_BY_KEYWORD } from '../constants';
import axios from 'axios';

export function getProductsByKeyword(keyword){
    return function (dispatch){
        axios.get(`http://localhost:3000/products/search?query=${keyword}`)
        .then(products => {
            dispatch({type: GET_PRODUCTS_BY_KEYWORD, products:products.data})
        })
    }
};


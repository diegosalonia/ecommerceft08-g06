import {GET_PAGE_PRODUCTS} from '../constants';
import axios from 'axios';

export const getPageProducts = (page, pageSize, totalProducts, products) => {
    return {
        type: GET_PAGE_PRODUCTS,
        payload: {
            page,
            pageSize,
            totalProducts,
            products
        }
    }
}

export const getPaginatedProducts = (page, pageSize) => (dispatch) => {
    axios.get(`http://localhost:3000/products/catalog/?page=${page}&pageSize=${pageSize}`)
    .then(products => {
        var totalProducts = products.data.totalProducts;
        dispatch(getPageProducts(page, pageSize, totalProducts, products));
    })
    .catch(error => console.log("Error axios getPaginatedProducts: ", error))  
}

import {GET_PAGE_PRODUCTS} from '../constants';
import axios from 'axios';

export const getPageProducts = (page, pageSize, totalProducts, products, filterBox) => {
    return {
        type: GET_PAGE_PRODUCTS,
        payload: {
            page,
            pageSize,
            totalProducts,
            products,
            filterBox
        }
    }
}

export const getPaginatedProducts = (page, pageSize, filterBox) => (dispatch) => {
    console.log("Linea 18: ", filterBox)
    axios.get(`http://localhost:3000/products/catalog/?page=${page}&pageSize=${pageSize}&categories=[${[...filterBox.categories]}]`)
    .then(products => {
        var totalProducts = products.data.totalProducts;
        dispatch(getPageProducts(page, pageSize, totalProducts, products, filterBox));
    })
    .catch(error => console.log("Error axios getPaginatedProducts: ", error))  
}

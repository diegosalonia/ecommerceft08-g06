import {GET_PAGE_PRODUCTS} from '../constants';
import axios from 'axios';

export const getPageProducts = (page, pageSize, products) => {
    return {
        type: GET_PAGE_PRODUCTS,
        payload: {
            page,
            pageSize,
            products: products
        }
    }
}

export const getPaginatedProducts = (page, pageSize, setProductList) => (dispatch) => {
    axios.get(`http://localhost:3000/products/catalog/?page=${page}&pageSize=${pageSize}`)
    .then(products => {
        console.log("Products reducer data: ", products);
        dispatch(getPageProducts(page,pageSize, products));
        //setProductList(products.data);
    })
    .catch(error => console.log("Error axios getPaginatedProducts: ", error))  
}

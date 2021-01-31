import {GET_PAGE_PRODUCTS, UPDATE_FILTERS, UPDATE_PAGE} from '../constants';
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
    if (Array.isArray(filterBox.categories) && filterBox.categories.length >= 1){
        const cats = filterBox.categories
        axios.get(`http://localhost:3000/products/catalog/?page=${page}&pageSize=${pageSize}&categories=[${[...cats]}]`)
        .then(products => {
        var totalProducts = products.data.totalProducts;
        dispatch(getPageProducts(page, pageSize, totalProducts, products, filterBox));
    })
    .catch(error => console.log("Error axios getPaginatedProducts: ", error))  
    }
    else {
        var cats = filterBox.categories
        axios.get(`http://localhost:3000/products/catalog/?page=${page}&pageSize=${pageSize}`)
        .then(products => {
        var totalProducts = products.data.totalProducts;
        dispatch(getPageProducts(page, pageSize, totalProducts, products, filterBox));
    })
    .catch(error => console.log("Error axios getPaginatedProducts: ", error))  
    }
    
}

export const updateFilter = (categories) => {
    return {
        type: UPDATE_FILTERS,
        payload: {
            categories
        }
    }
}

export const updatePage = (page) => {
    return {
        type: UPDATE_PAGE,
        payload: {
            page
        }
    }
}
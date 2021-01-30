 import cartTypes from '../constants.js';
 import axios from 'axios'; 

export const getCart = (userId,orderId) => {
    return function(dispatch){
        return axios.get(`http://localhost:3000/users/${userId}/cart/${orderId}`)
        .then(resp => resp.json())
        .then((json)=>
            dispatch({
                type: cartTypes.GET_CART,
                payload: json
            })
        )
    }
};

export const changeQuantityCartProduct = (product, userId, orderId) => {
    return function(dispatch){
        return axios.put(`http://localhost:3000/users/${userId}/cart/${orderId}`, {product})
        .then( response =>
            dispatch({
                type: cartTypes.CHANGE_QUANTITY_CART_PRODUCT,
                product
            })
        )
        
    }
};

export const removeAllProductToCart = (userId) => { // elimina todos
    return function(dispatch){
        return axios.delete(`http://localhost:3000/users/${userId}/cart`, {form})
        .then( resp =>
            dispatch({
                type: cartTypes.REMOVE_ALL_PRODUCT_TO_CART,
                payload: resp
            })
        )
    }
};

export const removeProductToCart = (userId) => {  // elimina solo uno 
    return function(dispatch){
        return axios.delete(`http://localhost:3000/users/${userId}/cart/${orderId}`, {product})
        .then(resp => resp.json())
        .then((json)=>
            dispatch({
                type: cartTypes.removeProductToCart,
                payload: json
            })
        )
    }
} 

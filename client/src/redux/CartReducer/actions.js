 import cartTypes from '../constants.js';
 import axios from 'axios'; 

export const removeProductToCart = productId => {
    return {
        type: cartTypes.REMOVE_PRODUCT_TO_CART,
        payload: productId
    }
};

export const changeQuantityCartProduct = (product, userId) => {
    return function(dispatch){
        return axios.post(`http://localhost:3000/users/${userId}/cart`, {product})
        .then( response =>
            dispatch({
                type: cartTypes.CHANGE_QUANTITY_CART_PRODUCT,
                product
            })
        )
        
    }
};

export const removeAllProductToCart = productId => {
    return {
        type: cartTypes.REMOVE_ALL_PRODUCT_TO_CART,
        payload: orderId
    }
};
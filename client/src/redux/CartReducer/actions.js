import cartTypes from '../constants.js'

export const removeProductToCart = productId => {
    return {
        type: cartTypes.REMOVE_PRODUCT_TO_CART,
        payload: productId
    }
};

export const incrementCartItem = productId => {
    return {
        type: cartTypes.INCREMENT_CART_ITEM,
        payload: productId
    }
};

export const decrementCartItem = productId => {
    return {
        type: cartTypes.DECREMENT_CART_ITEM,
        payload: productId
    }
};
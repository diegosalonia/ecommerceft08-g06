import cartTypes from './constants.js'

const initialState = {
    producList : []
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case cartTypes.REMOVE_PRODUCT_TO_CART:
            return {
                productList: action.payload.productId
            }
        
        case cartTypes.INCREMENT_CART_ITEM:
            return {
                productList: action.payload.productId
            }
        
        case cartTypes.DECREMENT_CART_ITEM:
            return {
                productList: action.payload.productId
            }
    }
}


export default cartReducer;
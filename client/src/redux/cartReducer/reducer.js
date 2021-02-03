import { GET_PRODUCTS_IN_CART, CHANGE_PRODUCT_QUANTITY, 
         DELETE_PRODUCT_FROM_CART, DELETE_ALL_CART,
         GO_TO_CHECKOUT } from '../constants';

const initialState = {
    productsInCart: []
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_IN_CART:
            return {
                ...state,
                productsInCart: action.products
            };
        case CHANGE_PRODUCT_QUANTITY:
            return {
                ...state,
                productsInCart: state.productsInCart.map(el => {
                    if (el.id === action.product.id) {
                        el.order_line.quantity = action.product.quantity;
                    }
                    return el;
                })
            };
        case DELETE_PRODUCT_FROM_CART:
            return {
                ...state,
                productsInCart: state.productsInCart.filter(product => product.id !== action.productId)
            };
        case DELETE_ALL_CART:
            return {
                ...state,
                productsInCart: []
            };
        default:
            return state;
    };
};

export default cartReducer;

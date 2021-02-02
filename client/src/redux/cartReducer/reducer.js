import { GET_PRODUCTS_IN_CART } from '../constants';

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
        default:
            return state;
    };
};

export default cartReducer;

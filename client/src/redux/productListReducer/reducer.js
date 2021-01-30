import { GET_PRODUCTS } from '../constants';

const initialState = {
    products: []
};

const productListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.products
            };
        default:
            return state;
    };
};

export default productListReducer;
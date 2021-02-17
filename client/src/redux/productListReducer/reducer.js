import { GET_PRODUCTS, DELETE_PRODUCT } from '../constants';

const initialState = {
    products: [],
    isDeleted: false
};

const productListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:            
            return {
                ...state,
                products: action.products,
                
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                isDeleted: true
            };
        default:
            return state;
    };
};

export default productListReducer;
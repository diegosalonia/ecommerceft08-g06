import { GET_PRODUCT, GET_PRODUCT_ERROR, SHOW_LOADER, HIDE_LOADER, ADD_PRODUCT_TO_CART } from '../constants';

const initialState = {
    product: {},
    isLoading: false,
    productId: 0,
    isInCart: false
};

const productReducer = (state = initialState, action) => {
    // console.log("ACTION REDUCER: ", action);
    switch(action.type) {
        case SHOW_LOADER:
            return {
                ...state,
                isLoading: true
            };
        case GET_PRODUCT:
            return {
                ...state,
                product: action.product
            };
        case HIDE_LOADER:
            return {
                ...state,
                isLoading: false
            }
        case ADD_PRODUCT_TO_CART:
            return {
                ...state,
                productId: action.id,
                isInCart: true
            }
        default:
            return {
                ...state
            };
    };
    
};

export default productReducer;

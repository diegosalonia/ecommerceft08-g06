import { GET_PRODUCT, GET_PRODUCT_ERROR, SHOW_LOADER, HIDE_LOADER } from '../constants';

const initialState = {
    product: {},
    isLoading: false
};

const productReducer = (state = initialState, action) => {
    // console.log("ACTION REDUCER: ", action);
    switch(action.type) {
        case SHOW_LOADER:
            console.log("SHOWLOADER REDUCER");
            return {
                ...state,
                isLoading: true
            };
        case GET_PRODUCT:
            console.log("GETPRODUCT REDUCER", state);
            return {
                isLoading: false,
                product: action.product
            };
        default:
            return {
                ...state
            };
    };
    
};

export default productReducer;

import { GET_PRODUCT, GET_PRODUCT_ERROR } from '../constants';

const initialState = {
    product: {}
};

const productReducer = (state = initialState, action) => {
    console.log("ACTION REDUCER: ", action);
    switch(action) {
        case GET_PRODUCT:
            return {
                product: action.product
            };
        default:
            return {
                ...state
            };
    };
};

export default productReducer;

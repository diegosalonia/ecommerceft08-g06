import { GET_PRODUCT, GET_CATEGORIES } from '../constants';

const initialState = {
    product: {},
    categories: []
};

const updateProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT:
            return {
                ...state,
                product: action.product
            };
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            };
        default:
            return state;
    };
};

export default updateProductReducer;

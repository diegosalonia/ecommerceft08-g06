import { CREATE_PRODUCT, GET_CATEGORIES } from '../constants';

const initialState = {
    newProduct: {},
    categories: [],
    isLoading: false,
};

const createProductReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_PRODUCT:
            return {
                ...state,
                newProduct: action.newProduct,
                isLoading: true,
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

export default createProductReducer;

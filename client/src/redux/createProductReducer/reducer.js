import { CREATE_PRODUCT, GET_CATEGORIES } from '../constants';

const initialState = {
    newProduct: {},
    categories: []
};

const createProductReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_PRODUCT:
            return {
                newProduct: action.newProduct
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

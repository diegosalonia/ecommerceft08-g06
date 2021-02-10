import { GET_PRODUCT, SHOW_LOADER, HIDE_LOADER, 
         ADD_PRODUCT_TO_CART, GET_ALL_REVIEWS , ADD_NEW_REVIEW } from '../constants';

const initialState = {
    product: {},
    isLoading: false,
    productId: 0,
    isInCart: false,
    reviews: [],
};

const productReducer = (state = initialState, action) => {
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
            };
        case ADD_PRODUCT_TO_CART:
            return {
                ...state,
                productId: action.id,
                isInCart: true
            };
        case GET_ALL_REVIEWS:
            return {
                ...state,
                reviews: action.reviews
            };
        case ADD_NEW_REVIEW:
            return {
                ...state,
                reviewChanged: true
            };
        default:
            return {
                ...state
            };
    };
    
};

export default productReducer;

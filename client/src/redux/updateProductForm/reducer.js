import { GET_PRODUCT, GET_CATEGORIES, DELETE_IMAGE, EDIT_PRODUCT } from '../constants';

const initialState = {
    product: {},
    categories: [],
    deletedImages: []
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
        case DELETE_IMAGE:
            return {
                ...state,
                deletedImages: state.deletedImages.concat(action.image),
                product: {...state.product, image: state.product.image.filter(image => image !== action.image)}
            }
        default:
            return state;
    };
};

export default updateProductReducer;

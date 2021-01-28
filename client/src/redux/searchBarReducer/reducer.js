import { GET_PRODUCTS_BY_KEYWORD } from '../constants';

const initialState = {
    products: []
}

const searchBarReducer  = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_BY_KEYWORD:
            return{
                products: action.products
            }
    
        default:
            return state
    }
}

export default searchBarReducer;
import {GET_PAGE_PRODUCTS} from '../constants';

const initialState = {
    page: 1,
    pageSize: 1,
    totalProducts: 0,
    products: {},
    filterBox: {}
}

export default function catalogReducer(state = initialState, action)  {
    switch (action.type){
        case GET_PAGE_PRODUCTS:
            return {
                page: action.payload.page, pageSize: action.payload.pageSize, 
                totalProducts: action.payload.totalProducts, products: action.payload.products.data,
                filterBox: action.payload.filterBox
            }
        default: 
            return state;
    }
}


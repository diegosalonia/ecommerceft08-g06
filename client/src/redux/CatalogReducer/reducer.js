import {GET_PAGE_PRODUCTS, UPDATE_FILTERS, UPDATE_PAGE} from '../constants';

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
        case UPDATE_FILTERS: 
            return {
                ...state,
                filterBox: action.payload.categories
            }
        case UPDATE_PAGE:
            return{
                ...state,
                page: action.payload.page
            }    
        default: 
            return state;
    }
}


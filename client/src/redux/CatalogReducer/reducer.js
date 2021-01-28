import {GET_PAGE_PRODUCTS} from '../constants';

const initialState = {
    page: 1,
    pageSize: 1
}

export default function catalogReducer(state = initialState, action) {
    switch (action.type){
        case GET_PAGE_PRODUCTS:
            return {page: action.payload.page, pageSize: action.payload.pageSize}
        default: 
            return state;
    }
}


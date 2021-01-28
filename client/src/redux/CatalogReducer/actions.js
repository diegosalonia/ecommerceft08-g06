import {GET_PAGE_PRODUCTS} from '../constants'

export const getPageProducts = (page, pageSize) => {
    return {
        type: GET_PAGE_PRODUCTS,
        payload: {
            page,
            pageSize
        }
    }
}
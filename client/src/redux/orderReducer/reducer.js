import { GET_ORDER } from '../constants'

const initialState = {
    products: []
}

const orderReducer = (state = initialState, action ) => {
    switch(action.type){
    case GET_ORDER:
        return {
            ...state,
            products: action.products
        }
    default:
        return state
    }
}

export default orderReducer

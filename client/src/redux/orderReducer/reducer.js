import { GET_ORDER, CHANGE_ORDER_STATUS_IN_ORDER_DETAIL } from '../constants'

const initialState = {
    products: [],
    status: "",
    order: {}
}

const orderReducer = (state = initialState, action ) => {
    switch(action.type){
    case GET_ORDER:
        return {
            products: action.order.products,
            status: action.order.status,
            order: action.order
        }
    case CHANGE_ORDER_STATUS_IN_ORDER_DETAIL:
        return{
            ...state,
            products: action.order.products,
            status: action.order.status,
        }
    default:
        return state
    }
}

export default orderReducer

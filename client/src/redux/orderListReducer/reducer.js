import { GET_ORDERS } from '../constants';

const initialState = {
    orderList: []
};

const orderListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orderList: action.orders
            };
        default:
            return state;
    };
};

export default orderListReducer;

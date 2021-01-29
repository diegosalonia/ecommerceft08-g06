import { combineReducers } from 'redux';
import productReducer from './productReducer/reducer';
import orderReducer from './orderReducer/reducer';

const rootReducer = combineReducers(
    {
        productReducer,
        orderReducer
    }
);

export default rootReducer;
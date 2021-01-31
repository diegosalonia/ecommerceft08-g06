import { combineReducers } from 'redux';
import productReducer from './productReducer/reducer';
import cartReducer from './CartReducer/reducer';

const rootReducer = combineReducers(
    {
        productReducer,
        cartReducer
    }
);

export default rootReducer;
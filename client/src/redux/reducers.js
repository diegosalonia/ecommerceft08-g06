import { combineReducers } from 'redux';
import productReducer from './productReducer/reducer';
import cartReducer from './cartReducer/reducer';

const rootReducer = combineReducers(
    {
        productReducer,
        cartReducer
    }
);

export default rootReducer;
import { combineReducers } from 'redux';
import productReducer from './productReducer/reducer';

const rootReducer = combineReducers(
    {
        productReducer
    }
);

export default rootReducer;
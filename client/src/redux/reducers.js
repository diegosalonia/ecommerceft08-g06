import { combineReducers } from 'redux';
import productReducer from './productReducer/reducer';
import searchBarReducer from './searchBarReducer/reducer'

const rootReducer = combineReducers(
    {
        productReducer,
        searchBarReducer
    }
);

export default rootReducer;
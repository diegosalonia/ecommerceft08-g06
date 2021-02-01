import { combineReducers } from 'redux';
import productReducer from './productReducer/reducer';
import catalogReducer from './CatalogReducer/reducer';

const rootReducer = combineReducers(
    {
        productReducer,
        catalogReducer
    }
);

export default rootReducer;
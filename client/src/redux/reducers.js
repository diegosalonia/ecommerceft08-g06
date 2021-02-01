import { combineReducers } from 'redux';
import productReducer from './productReducer/reducer';
import catalogReducer from './CatalogReducer/reducer';
import orderReducer from './orderReducer/reducer';
import searchBarReducer from './searchBarReducer/reducer'

const rootReducer = combineReducers(
    {
        productReducer,
        catalogReducer,
        searchBarReducer,
        orderReducer
    }
);

export default rootReducer;
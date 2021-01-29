import { combineReducers } from 'redux';
import productReducer from './productReducer/reducer';
import catalogReducer from './CatalogReducer/reducer';
import orderReducer from './orderReducer/reducer';

const rootReducer = combineReducers(
    {
        productReducer,
        catalogReducer,
        orderReducer
    }
);

export default rootReducer;
import { combineReducers } from 'redux';
import productReducer from './productReducer/reducer';
import catalogReducer from './CatalogReducer/reducer';
import orderReducer from './orderReducer/reducer';
import createProductReducer from './createProductReducer/reducer';
import productListReducer from './productListReducer/reducer';

const rootReducer = combineReducers(
    {
        productReducer,
        catalogReducer,
        orderReducer,
        createProductReducer,
        productListReducer
    }
);

export default rootReducer;
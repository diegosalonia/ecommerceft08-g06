import { combineReducers } from 'redux';
import productReducer from './productReducer/reducer';
import catalogReducer from './CatalogReducer/reducer';
import orderReducer from './orderReducer/reducer';
import createProductReducer from './createProductReducer/reducer';
import productListReducer from './productListReducer/reducer';
import updateProductReducer from './updateProductForm/reducer';

const rootReducer = combineReducers(
    {
        productReducer,
        catalogReducer,
        orderReducer,
        createProductReducer,
        productListReducer,
        updateProductReducer
    }
);

export default rootReducer;

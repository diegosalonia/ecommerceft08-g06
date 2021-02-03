import { combineReducers } from 'redux';
import productReducer from './productReducer/reducer';
import catalogReducer from './CatalogReducer/reducer';
import orderReducer from './orderReducer/reducer';
import createProductReducer from './createProductReducer/reducer';
import productListReducer from './productListReducer/reducer';
import updateProductReducer from './updateProductForm/reducer';
import orderListReducer from './orderListReducer/reducer';
import loginReducer from './loginReducer/reducer';

const rootReducer = combineReducers(
    {
        productReducer,
        catalogReducer,
        orderReducer,
        createProductReducer,
        productListReducer,
        updateProductReducer,
        orderListReducer,
        loginReducer
    }
);

export default rootReducer;

import { combineReducers } from 'redux';
import productReducer from './productReducer/reducer';
import catalogReducer from './CatalogReducer/reducer';
import createProductReducer from './createProductReducer/reducer';
import productListReducer from './productListReducer/reducer';
import updateProductReducer from './updateProductForm/reducer';
import orderListReducer from './orderListReducer/reducer';
import reviewReducer from './ReviewReducer/reducer';

const rootReducer = combineReducers(
    {
        productReducer,
        catalogReducer,
        createProductReducer,
        productListReducer,
        updateProductReducer,
        orderListReducer,
        reviewReducer
    }
);

export default rootReducer;

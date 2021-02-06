import { combineReducers } from 'redux';
import productReducer from './productReducer/reducer';
import catalogReducer from './CatalogReducer/reducer';
import orderReducer from './orderReducer/reducer';
import searchBarReducer from './searchBarReducer/reducer'
import createProductReducer from './createProductReducer/reducer';
import productListReducer from './productListReducer/reducer';
import updateProductReducer from './updateProductForm/reducer';
import orderListReducer from './orderListReducer/reducer';
import reviewReducer from './ReviewReducer/reducer';
import loginReducer from './loginReducer/reducer';
import cartReducer from './cartReducer/reducer';
import passwordResetReducer from './passwordResetReducer/reducer'

const rootReducer = combineReducers(
    {
        productReducer,
        catalogReducer,
        searchBarReducer,
        orderReducer,
        createProductReducer,
        productListReducer,
        updateProductReducer,
        orderListReducer,
        reviewReducer,
        cartReducer,
        loginReducer,
        passwordResetReducer
    }
);

export default rootReducer;

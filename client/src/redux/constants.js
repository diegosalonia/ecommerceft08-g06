/* Actions constants */

/* start productReducer */
export const GET_PRODUCT = 'GET_PRODUCT'; // used in updateProductReducer too
export const GET_PRODUCT_ERROR = 'GET_PRODUCT_ERROR';
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS';
export const EDIT_REVIEW = 'EDIT_REVIEW';
export const ADD_NEW_REVIEW = 'ADD_NEW_REVIEW';
/* end productReducer */

/* start createProductReducer */
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const GET_CATEGORIES = 'GET_CATEGORIES';
/* end createProductReducer */

/* start productListReducer */
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
/* end productListReducer */

/* start updateProductReducer */
// GET_PRODUCT

/* end updateProductReducer */

/* start orderListReducer */
export const GET_ORDERS = 'GET_ORDERS';
/* end orderListReducer */

/* start cartReducer */
export const GET_PRODUCTS_IN_CART = 'GET_PRODUCTS_IN_CART';
export const CHANGE_PRODUCT_QUANTITY = 'CHANGE_PRODUCT_QUANTITY';
export const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART';
export const DELETE_ALL_CART = 'DELETE_ALL_CART';
export const GO_TO_CHECKOUT = 'GO_TO_CHECKOUT';
export const CHANGE_ORDER_STATUS = 'CHANGE_ORDER_STATUS';
export const CHANGE_PRODUCT_QUANTITY_NO_USER = 'CHANGE_PRODUCT_QUANTITY_NO_USER';
export const SEND_ORDER_EMAIL = 'SEND_ORDER_EMAIL';
/* end cartReducer */

/* Catalog - Pagination */
export const GET_PAGE_PRODUCTS = "getPageProducts";
export const UPDATE_FILTERS = "updateFilters";
export const UPDATE_PAGE = "updatePage";

// order constansts
export const GET_ORDER = "GET_ORDER";
export const CHANGE_ORDER_STATUS_IN_ORDER_DETAIL = "CHANGE_ORDER_STATUS"

/*Review Start */
export const GET_REVIEWS = "getReviews";
/*Review end*/ 

/*start loginReducer*/
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const ADD_NEW_ADDRESS = 'ADD_NEW_ADDRESS';
/* end loginReducer*/

/* searchBar constants */

/*password reset constants*/
export const SEND_EMAIL = "SEND_EMAIL"
export const RESET_PASSWORD = "RESET_PASSWORD"
export const CHANGE_PASSWORD = "CHANGE_PASSWORD"

/* user constants */
export const GET_USER = "GET_USER"
export const GET_PRODUCTS_BY_KEYWORD = "GET_PRODUCTS_BY_KEYWORD";

/*start userListReducer */
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER = "UPDATE_USER";

/* Config authentication */
export const config = token => {
    return {
        headers: {
             Authorization: `Bearer ${token}` 
        }
    }
};

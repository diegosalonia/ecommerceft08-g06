/* Actions constants */

/* start productReducer */
export const GET_PRODUCT = 'GET_PRODUCT'; // used in updateProductReducer too
export const GET_PRODUCT_ERROR = 'GET_PRODUCT_ERROR';
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
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
/* end cartReducer */

/* Catalog - Pagination */
export const GET_PAGE_PRODUCTS = "getPageProducts";
export const UPDATE_FILTERS = "updateFilters";
export const UPDATE_PAGE = "updatePage";
/* Catalog end - Pagination*/

// order constansts
export const GET_ORDER = "GET_ORDER"

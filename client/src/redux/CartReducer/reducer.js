import cartTypes from "../constants.js";

const initialState = {
  producList: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartTypes.GET_CART:
      return {
        ...state,
        producList: action.products
      };

    case cartTypes.CHANGE_QUANTITY_CART_PRODUCT:
      return {
        ...state,
        producList: action.products,
      };

    case cartTypes.REMOVE_ALL_PRODUCT_TO_CART:
      return {
        ...state,
        producList: action.products,
      };

    default:         // este seria el de remove por uno
      return state
  }
};

export default cartReducer;

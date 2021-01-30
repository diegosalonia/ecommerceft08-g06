import cartTypes from "../constants.js";

const initialState = {
  producList: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartTypes.REMOVE_PRODUCT_TO_CART:
      return {
        ...state,
        productList: action.payload.productId,
      };

    case cartTypes.CHANGE_QUANTITY_CART_PRODUCT:
      return {
        ...state,
        productList: action.payload.productId,
      };

    case cartTypes.REMOVE_ALL_PRODUCT_TO_CART:
      return {
        ...state,
        productList: action.payload.orderId,
      };

    default:
      return state;
  }
};

export default cartReducer;

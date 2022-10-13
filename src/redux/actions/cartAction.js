import ACTIONS from "./index";

export const ADD_ITEM_TO_CART = (item) => {
  return {
    type: ACTIONS.ADD_TO_CART,
    payload: {
      items: item,
    },
  };
};

export const REMOVE_ITEM_FROM_CART = (item) => {
  return {
    type: ACTIONS.DELETE_FROM_CART,
    payload: {
      item,
    },
  };
};

export const UPDATE_CART = (item, qty) => {
  return {
    type: ACTIONS.UPDATE_CART_ITEM,
    payload: {
      items: item,
      qty: qty,
    },
  };
};

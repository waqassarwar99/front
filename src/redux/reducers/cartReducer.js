import ACTIONS from "../actions/";

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART:
      const additems = (cartitem, product) => {
        let found = false;
        let product_index = -1;
        cartitem.map((item, index) => {
          if (item.product._id === product._id) {
            found = true;
            product_index = index;
          }
        });
        if (found) {
          cartitem[product_index].qty = cartitem[product_index].qty + 1;
        } else {
          cartitem.push({ product: product, qty: 1 });
        }
        return cartitem;
      };
      return {
        ...state,
        items: additems(state.items, action.payload.items),
      };
    case ACTIONS.DELETE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(
          (val) => val.product._id !== action.payload.item._id
        ),
      };
    case ACTIONS.UPDATE_CART_ITEM:
      const updateitem = (cartitem, product, qty) => {
        let found = false;
        let product_index = -1;
        cartitem.map((item, index) => {
          if (item.product._id === product._id) {
            found = true;
            product_index = index;
          }
        });
        if (found) {
          cartitem[product_index].qty = qty;
        }
        return cartitem;
      };
      return {
        ...state,
        items: updateitem(
          state.items,
          action.payload.items,
          action.payload.qty
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;

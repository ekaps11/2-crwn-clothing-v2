import { CART_ACTION_TYPES } from './cart.type';

const CART_INIT_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartTotal: 0,
  totalPrice: 0,
};

export const cartReducer = (state = CART_INIT_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };

    case CART_ACTION_TYPES.SET_CART_ITEM:
      return { ...state, cartItems: payload };

    case CART_ACTION_TYPES.SET_CART_QTY:
      return { ...state, cartTotal: payload };

    case CART_ACTION_TYPES.SET_CART_TOTAL:
      return { ...state, totalPrice: payload };

    default:
      return state;
  }
};

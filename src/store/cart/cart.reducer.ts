import { AnyAction } from 'redux';
import { CartItem } from './cart.types';
import { setIsCartOpen, setCartItems } from './cart.action';

type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};

const CART_INIT_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (state = CART_INIT_STATE, action: AnyAction) => {
  if (setIsCartOpen.match(action))
    return { ...state, isCartOpen: action.payload };

  if (setCartItems.match(action))
    return { ...state, cartItems: action.payload };

  return state;
};

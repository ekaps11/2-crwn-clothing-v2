import { createContext, useReducer } from 'react';
import { createAction } from '../../utils/reducer/reducer.utils';

// helper
const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(item => item.id === productToAdd.id);

  // if found increment quantity
  if (existingCartItem)
    return cartItems.map(item =>
      item.id === productToAdd.id
        ? { ...item, quantity: ++item.quantity }
        : item
    );

  // return new array with modified cartItems / new cartItems
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const reduceCartItem = (cartItems, productToReduce) => {
  const existingCartItem = cartItems.find(
    item => item.id === productToReduce.id
  );

  if (existingCartItem.quantity === 1)
    return cartItems.filter(item => item.id !== productToReduce.id);

  return cartItems.map(item =>
    item.id === productToReduce.id
      ? { ...item, quantity: --item.quantity }
      : item
  );
};

const removeCartItem = (cartItems, productToRemove) =>
  cartItems.filter(item => item.id !== productToRemove.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  reduceItemFromCart: () => {},
  removeItemFromCart: () => {},
  cartTotal: 0,
  totalPrice: 0,
});

const CART_ACTION_TYPES = {
  SET_CART_OPEN: 'SET_CART_OPEN',
  SET_CART_ITEM: 'SET_CART_ITEM',
};

const INIT_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartTotal: 0,
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEM:
      return {
        ...state,
        ...payload,
      };

    case CART_ACTION_TYPES.SET_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in cartreducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartTotal, totalPrice }, dispatch] =
    useReducer(cartReducer, INIT_STATE);

  const updateCartItem = cartItems => {
    const newCartTotalQty = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const newTotalPrice = cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEM, {
        cartItems,
        cartTotal: newCartTotalQty,
        totalPrice: newTotalPrice,
      })
    );
  };

  const setIsCartOpen = bool =>
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_OPEN, bool));

  const addItemToCart = productToAdd => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItem(newCartItems);
  };

  const reduceItemFromCart = productToReduce => {
    const newCartItems = reduceCartItem(cartItems, productToReduce);
    updateCartItem(newCartItems);
  };

  const removeItemFromCart = productToRemove => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItem(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    reduceItemFromCart,
    removeItemFromCart,
    cartItems,
    cartTotal,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

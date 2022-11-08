import { createAction } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES } from './cart.type';

const addCartItem = (cartItems, productToAdd) => {
  const existingItem = cartItems.find(item => item.id === productToAdd.id);

  if (existingItem)
    return cartItems.map(item =>
      item.id === productToAdd.id
        ? { ...item, quantity: ++item.quantity }
        : item
    );

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) =>
  cartItems.filter(item => item.id !== productToRemove.id);

const reduceCartItem = (cartItems, productToReduce) => {
  const existingItem = cartItems.find(item => item.id === productToReduce.id);

  if (existingItem.quantity === 1)
    return removeCartItem(cartItems, productToReduce);

  return cartItems.map(item =>
    item.id === productToReduce.id
      ? { ...item, quantity: --item.quantity }
      : item
  );
};

export const setIsCartOpen = bool =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEM, newCartItems);
};

export const reduceItemFromCart = (cartItems, productToReduce) => {
  const newCartItems = reduceCartItem(cartItems, productToReduce);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEM, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEM, newCartItems);
};

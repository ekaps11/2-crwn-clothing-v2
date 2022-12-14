import { CART_ACTION_TYPES, CartItem } from './cart.types';
import { CategoryItem } from '../categories/category.types';
import { createAction, withMatcher } from '../../utils/reducer/reducer.utils';

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  const existingItem = cartItems.find(item => item.id === productToAdd.id);

  if (existingItem)
    return cartItems.map(item =>
      item.id === productToAdd.id
        ? { ...item, quantity: ++item.quantity }
        : item
    );

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: CartItem[], productToRemove: CartItem) =>
  cartItems.filter(item => item.id !== productToRemove.id);

const reduceCartItem = (cartItems: CartItem[], productToReduce: CartItem) => {
  const existingItem = cartItems.find(item => item.id === productToReduce.id);

  if (existingItem?.quantity === 1)
    return removeCartItem(cartItems, productToReduce);

  return cartItems.map(item =>
    item.id === productToReduce.id
      ? { ...item, quantity: --item.quantity }
      : item
  );
};

export const setIsCartOpen = withMatcher((bool: boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
);

export const setCartItems = withMatcher((cartItem: CartItem[]) =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEM, cartItem)
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);

  return setCartItems(newCartItems);
};

export const reduceItemFromCart = (
  cartItems: CartItem[],
  productToReduce: CartItem
) => {
  const newCartItems = reduceCartItem(cartItems, productToReduce);

  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  productToRemove: CartItem
) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);

  return setCartItems(newCartItems);
};

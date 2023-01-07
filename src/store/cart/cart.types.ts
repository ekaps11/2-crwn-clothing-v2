import { CategoryItem } from '../categories/category.types';

export enum CART_ACTION_TYPES {
  SET_IS_CART_OPEN = 'cart/SET_IS_CART_OPEN',
  SET_CART_ITEM = 'cart/SET_CART_ITEM',
  SET_CART_QTY = 'cart/SET_CART_QTY',
  SET_CART_TOTAL = 'cart/SET_CART_TOTAL',
}

export type CartItem = CategoryItem & { quantity: number };
import { createSelector } from 'reselect';
import { RootState } from '../store';

const cartSelector = ({ cart }: RootState) => cart;

export const selectCartToggler = createSelector(
  cartSelector,
  ({ isCartOpen }) => isCartOpen
);

export const selectCart = createSelector(
  cartSelector,
  ({ cartItems }) => cartItems
);

export const selectCartQty = createSelector(selectCart, cartItems =>
  cartItems.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotalPrice = createSelector(selectCart, cartItems =>
  cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
);
import { createContext, useEffect, useState } from 'react';

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
  cartItems: [],
  addItemToCart: () => {},
  reduceItemFromCart: () => {},
  removeItemFromCart: () => {},
  cartTotal: 0,
  totalPrice: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const totalItem = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    setCartTotal(totalItem);
  }, [cartItems]);

  useEffect(() => {
    const total = cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    setTotalPrice(total);
  }, [cartItems]);

  const addItemToCart = productToAdd =>
    setCartItems(addCartItem(cartItems, productToAdd));

  const reduceItemFromCart = productToReduce =>
    setCartItems(reduceCartItem(cartItems, productToReduce));

  const removeItemFromCart = productToRemove =>
    setCartItems(removeCartItem(cartItems, productToRemove));

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    reduceItemFromCart,
    removeItemFromCart,
    cartTotal,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

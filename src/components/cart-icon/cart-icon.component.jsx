import { useContext } from 'react';
import { CartContext } from '../contexts/cart-context';
import { CartIconContainer, ShopIcon } from './cart-icon.styles';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartTotal } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShopIcon />
      <span>{cartTotal}</span>
    </CartIconContainer>
  );
};

export default CartIcon;

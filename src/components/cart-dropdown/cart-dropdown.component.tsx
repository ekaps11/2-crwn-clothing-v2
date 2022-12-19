import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import {
  CartDropdownContainer,
  CartItems,
  EmptyMsg,
} from './cart-dropdown.styles';
import { useSelector } from 'react-redux';
import { selectCart } from '../../store/cart/cart.selector';

const CartDropdown = () => {
  const cartItems = useSelector(selectCart);
  const navigate = useNavigate();

  const goToCheckout = useCallback(() => navigate('checkout'), []);

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map(item => <CartItem key={item.id} items={item} />)
        ) : (
          <EmptyMsg>Your cart is empty</EmptyMsg>
        )}
      </CartItems>

      <Button onClick={goToCheckout}>go to checkout</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;

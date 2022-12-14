import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartQty,
  selectCartToggler,
} from '../../store/cart/cart.selector';
import { CartIconContainer, ShopIcon } from './cart-icon.styles';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartTotal = useSelector(selectCartQty);
  const isCartOpen = useSelector(selectCartToggler);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShopIcon />
      <span>{cartTotal}</span>
    </CartIconContainer>
  );
};

export default CartIcon;

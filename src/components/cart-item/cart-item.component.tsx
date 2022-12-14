import { CartItemContainer } from './cart-item.styles';
import { CartItem as TCartItem } from '../../store/cart/cart.types';
import './cart-item.styles';

type CartItemProps = {
  items: TCartItem;
};

const CartItem = ({
  items: { name, imageUrl, price, quantity },
}: CartItemProps) => {
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />

      <div>
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </div>
    </CartItemContainer>
  );
};

export default CartItem;

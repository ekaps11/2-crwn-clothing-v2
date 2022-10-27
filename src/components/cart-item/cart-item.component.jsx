import { CartItemContainer } from './cart-item.styles.jsx';
import './cart-item.styles.jsx';

const CartItem = ({ items: { name, imageUrl, price, quantity } }) => (
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

export default CartItem;

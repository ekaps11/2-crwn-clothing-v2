import { useContext } from 'react';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CartContext } from '../../components/contexts/cart-context';
import {
  CheckoutContainer,
  CheckoutHeader,
  CheckoutTotal,
} from './checkout.styles';

const Checkout = () => {
  const { cartItems, totalPrice } = useContext(CartContext);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <div>
          <span>Product</span>
        </div>

        <div>
          <span>Description</span>
        </div>

        <div>
          <span>Quantity</span>
        </div>

        <div>
          <span>Price</span>
        </div>

        <div>
          <span>Remove</span>
        </div>
      </CheckoutHeader>

      {cartItems.map(product => (
        <CheckoutItem key={product.id} product={product} />
      ))}

      <CheckoutTotal>Total: ${totalPrice}</CheckoutTotal>
    </CheckoutContainer>
  );
};

export default Checkout;

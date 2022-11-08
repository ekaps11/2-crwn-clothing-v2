import { useSelector } from 'react-redux';
import {
  selectCart,
  selectCartTotalPrice,
} from '../../store/cart/cart.selector';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import {
  CheckoutContainer,
  CheckoutHeader,
  CheckoutTotal,
} from './checkout.styles';

const Checkout = () => {
  const cartItems = useSelector(selectCart);
  const totalPrice = useSelector(selectCartTotalPrice);

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

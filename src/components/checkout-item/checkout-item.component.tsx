import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
} from '../../store/cart/cart.action';
import { selectCart } from '../../store/cart/cart.selector';
import { CartItem } from '../../store/cart/cart.types';
import {
  CheckoutItemContainer,
  Image,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-item.styles';

type CheckoutItemProps = { product: CartItem };

const CheckoutItem = memo(({ product }: CheckoutItemProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCart);
  const { name, imageUrl, price, quantity } = product;

  const addItem = () => dispatch(addItemToCart(cartItems, product));
  const reduceItem = () => dispatch(reduceItemFromCart(cartItems, product));
  const removeItem = () => dispatch(removeItemFromCart(cartItems, product));

  return (
    <CheckoutItemContainer>
      <Image>
        <img src={imageUrl} alt={name} />
      </Image>

      <BaseSpan>{name}</BaseSpan>

      <Quantity>
        <Arrow onClick={reduceItem}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItem}>&#10095;</Arrow>
      </Quantity>

      <BaseSpan>
        <span>{price}</span>
      </BaseSpan>

      <RemoveButton onClick={removeItem}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
});

export default CheckoutItem;

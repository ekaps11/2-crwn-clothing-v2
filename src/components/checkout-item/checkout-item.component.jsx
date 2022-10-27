import { useContext } from 'react';
import { CartContext } from '../contexts/cart-context';
import {
  CheckoutItemContainer,
  Image,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-item.styles';

const CheckoutItem = ({ product }) => {
  const { name, imageUrl, price, quantity } = product;
  const { addItemToCart, reduceItemFromCart, removeItemFromCart } =
    useContext(CartContext);

  const addItem = () => addItemToCart(product);
  const reduceItem = () => reduceItemFromCart(product);
  const removeItem = () => removeItemFromCart(product);

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

      <BaseSpan>{price}</BaseSpan>

      <RemoveButton onClick={removeItem}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;

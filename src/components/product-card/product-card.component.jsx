import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCart } from '../../store/cart/cart.selector';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { ProductCardContainer } from './product-card.styles';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCart);
  const { name, price, imageUrl } = product;

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name} />

      <div>
        <span>{name}</span>
        <span>{price}</span>
      </div>

      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;

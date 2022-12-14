import { CategoryItem } from '../../store/categories/category.types';
import ProductCard from '../product-card/product-card.component';
import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from './category-preview.styles';

type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
};

const CategoryPreview = ({ title, products }: CategoryPreviewProps) => (
  <CategoryPreviewContainer>
    <Title to={title}>{title}</Title>

    <Preview>
      {products
        .filter((_, i) => i < 4)
        .map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
    </Preview>
  </CategoryPreviewContainer>
);

export default CategoryPreview;

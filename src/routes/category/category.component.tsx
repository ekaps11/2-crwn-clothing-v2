import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
import {
  selectCategories,
  selectCategoriesIsLoading,
} from '../../store/categories/category.selector';
import { CategoryContainer, Title } from './category.styles';

type CategoryRouteParams = { category: string };

const Category = () => {
  const categoriesMap = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const { category } = useParams() as CategoryRouteParams;
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(
    () => setProducts(categoriesMap[category]),
    [categoriesMap, category]
  );

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>

      <CategoryContainer>
        {isLoading ? (
          <Spinner />
        ) : (
          products &&
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;

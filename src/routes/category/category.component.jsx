import { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../components/contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoryContainer } from './category.styles';

const Category = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(
    () => setProducts(categoriesMap[category]),
    [categoriesMap, category]
  );

  return (
    <Fragment>
      <h2>
        <span>{category.toUpperCase()}</span>
      </h2>

      <CategoryContainer>
        {products &&
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;

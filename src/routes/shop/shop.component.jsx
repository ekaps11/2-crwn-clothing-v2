import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { getCollection } from '../../utils/firebase/firebase.utils';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { setCategoriesMap } from '../../store/category/category.action';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const categoryMap = await getCollection();

      dispatch(setCategoriesMap(categoryMap));
    })();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;

import { createContext, useEffect, useState } from 'react';
import { getCollection } from '../../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({ products: {} });

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap };

  // useEffect(() => addCollection('categories', SHOP_DATA), []); // should be commented after file has been imported

  useEffect(() => {
    (async () => {
      const categoryMap = await getCollection();

      setCategoriesMap(categoryMap);
    })();
  }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

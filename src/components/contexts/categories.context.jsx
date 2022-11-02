import { createContext, useEffect, useReducer } from 'react';
import { getCollection } from '../../utils/firebase/firebase.utils';
import { createAction } from '../../utils/reducer/reducer.utils';

export const CategoriesContext = createContext({ categoriesMap: {} });

const INIT_STATE = { categoriesMap: {} };

const categoriesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_CATEGORIES':
      return {
        ...state,
        categoriesMap: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in categoriesReducer`);
  }
};

export const CategoriesProvider = ({ children }) => {
  const [{ categoriesMap }, dispatch] = useReducer(
    categoriesReducer,
    INIT_STATE
  );

  const setCategoriesMap = category =>
    dispatch(createAction('SET_CATEGORIES', category));

  useEffect(() => {
    (async () => {
      const categoryMap = await getCollection();

      setCategoriesMap(categoryMap);
    })();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

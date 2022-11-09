import { createSelector } from 'reselect';

const categoriesSelector = ({ categories }) => categories;

export const selectCategories = createSelector(
  [categoriesSelector],
  ({ categories }) =>
    categories.reduce((acc, { title, items }) => {
      acc[title.toLowerCase()] = items;
      return acc;
    }, [])
);

export const selectCategoriesIsLoading = createSelector(
  [categoriesSelector],
  ({ isLoading }) => isLoading
);

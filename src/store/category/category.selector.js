import { createSelector } from 'reselect';

const categoriesSelector = ({ categories }) => categories;

export const selectCategoriesMap = createSelector(
  [categoriesSelector],
  ({ categoriesMap }) => categoriesMap
);

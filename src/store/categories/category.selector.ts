import { createSelector } from 'reselect';
import { CategoryMap } from './category.types';
import { RootState } from '../store';

const categoriesSelector = ({ categories }: RootState) => categories;

export const selectCategories = createSelector(
  categoriesSelector,
  ({ categories }) =>
    categories.reduce((acc, { title, items }) => {
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  categoriesSelector,
  ({ isLoading }) => isLoading
);

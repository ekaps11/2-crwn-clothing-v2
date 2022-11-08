import { createAction } from '../../utils/reducer/reducer.utils';
import { CATEGORIES_ACTION_TYPE } from './category.type';

export const setCategoriesMap = category =>
  createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORY, category);

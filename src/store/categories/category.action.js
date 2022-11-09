import { createAction } from '../../utils/reducer/reducer.utils';
import { CATEGORIES_ACTION_TYPES } from './category.types';
import { getCollection } from '../../utils/firebase/firebase.utils';

const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

const fetchCategoriesSuccess = category =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, category);

const fetchCategoriesFailed = err =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, err);

export const fetchCategoriesAsync = () => async dispatch => {
  dispatch(fetchCategoriesStart());

  try {
    const category = await getCollection();
    dispatch(fetchCategoriesSuccess(category));
  } catch (err) {
    dispatch(fetchCategoriesFailed(err));
  }
};

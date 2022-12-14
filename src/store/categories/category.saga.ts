import { all, call, put, takeLatest } from 'typed-redux-saga/macro';
import { getCollection } from '../../utils/firebase/firebase.utils';
import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';

function* fetchCategories() {
  try {
    const categories = yield* call(getCollection);
    yield* put(fetchCategoriesSuccess(categories));
  } catch (err) {
    yield* put(fetchCategoriesFailed(err as Error));
  }
}

function* onFetchCategories() {
  yield* takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategories
  );
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]);
}

import { createSelector } from 'reselect';
import { RootState } from '../store';

const userSelector = ({ user }: RootState) => user;

export const selectUser = createSelector(
  userSelector,
  ({ currentUser }) => currentUser
);

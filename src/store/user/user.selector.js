import { createSelector } from 'reselect';

const userSelector = ({ user }) => user;

export const selectUser = createSelector(
  [userSelector],
  ({ currentUser }) => currentUser
);

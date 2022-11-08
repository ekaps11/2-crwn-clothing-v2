import { USER_ACTION_TYPE } from './user.type';

export const USER_INIT_STATE = { currentUser: null };

export const userReducer = (state = USER_INIT_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPE.SET_CURRENT_USER:
      return { ...state, currentUser: payload };

    default:
      return state;
  }
};

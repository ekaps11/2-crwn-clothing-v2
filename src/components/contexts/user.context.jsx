import { createContext, useEffect, useReducer } from 'react';
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from '../../utils/firebase/firebase.utils';
import { createAction } from '../../utils/reducer/reducer.utils';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

const INIT_STATE = { currentUser: null };

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INIT_STATE);

  const setCurrentUser = user =>
    dispatch(createAction('SET_CURRENT_USER', user));

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(user => {
      user && createUserDocumentFromAuth(user);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser };

  console.log(currentUser);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

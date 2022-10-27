import { createContext, useState, useEffect } from 'react';
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from '../../utils/firebase/firebase.utils';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(
    () =>
      onAuthStateChangedListener(user => {
        user && createUserDocumentFromAuth(user, user.displayName);
        console.log(user);
        setCurrentUser(user);
      }),
    []
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

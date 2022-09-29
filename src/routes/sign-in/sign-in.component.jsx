import { Fragment } from 'react';
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  const logGooglePopup = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') return;
    }
  };

  return (
    <Fragment>
      <h1>Sign In Page</h1>
      <button onClick={logGooglePopup}>Sign in with google popup</button>
    </Fragment>
  );
};

export default SignIn;

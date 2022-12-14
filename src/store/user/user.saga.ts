import { User } from 'firebase/auth';
import { all, call, put, takeLatest } from 'typed-redux-saga/macro';
import { USER_ACTION_TYPES } from './user.types';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
  Details,
} from '../../utils/firebase/firebase.utils';

import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  signUpSuccess,
  SignUpStart,
  SignUpSuccess,
  EmailSignInStart,
} from './user.action';

function* getSnapshotFromUserAuth(userAuth: User, additionalInfo?: Details) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalInfo
    );

    if (userSnapshot)
      yield* put(
        signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
      );
  } catch (err) {
    yield* put(signInFailed(err as Error));
  }
}

function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (err) {
    yield* put(signInFailed(err as Error));
  }
}

function* signUp({ payload: { email, password, displayName } }: SignUpStart) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential;
      yield* put(signUpSuccess(user, { displayName }));
    }
  } catch (err) {
    yield* put(signUpFailed(err as Error));
  }
}

function* signInAfterSignUp({
  payload: { user, additionalInfo },
}: SignUpSuccess) {
  yield* call(getSnapshotFromUserAuth, user, additionalInfo);
}

function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (err) {
    yield* put(signInFailed(err as Error));
  }
}

function* signInWithEmail({ payload: { email, password } }: EmailSignInStart) {
  try {
    const data = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (data) {
      const { user } = data;
      yield* call(getSnapshotFromUserAuth, user);
    }
  } catch (err) {
    yield* put(signInFailed(err as Error));
  }
}

function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (err) {
    yield* put(signOutFailed(err as Error));
  }
}

function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

function* onSignUp() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

function* onGoogleSignIn() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* onEmailSignIn() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* onSignOut() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSaga() {
  yield* all([
    call(onCheckUserSession),
    call(onSignUp),
    call(onSignUpSuccess),
    call(onGoogleSignIn),
    call(onEmailSignIn),
    call(onSignOut),
  ]);
}

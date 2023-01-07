import { initializeApp } from 'firebase/app';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  query,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

import { Category } from '../../store/categories/category.types';

const firebaseConfig = {
  apiKey: 'AIzaSyBnb80iBDlY-pQP44tVbjDrQt8X2rzm06Y',
  authDomain: 'crwn-clothing-v2-61977.firebaseapp.com',
  projectId: 'crwn-clothing-v2-61977',
  storageBucket: 'crwn-clothing-v2-61977.appspot.com',
  messagingSenderId: '854830301395',
  appId: '1:854830301395:web:1b8f57db0c40957660d426',
};

type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

type Details = { displayName?: string };

type ObjectToAdd = { title: string };

export type { UserData, Details };

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

provider.setCustomParameters({
  prompt: 'select_account',
});

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const createUserDocumentFromAuth = async (
  userAuth: User,
  details = {} as Details
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...details,
      });
    } catch (err) {
      console.log('error while creating document ', err);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const getCurrentUser = (): Promise<User | null> =>
  new Promise(resolve => {
    const unsubscribe = onAuthStateChanged(auth, userAuth => {
      unsubscribe();
      resolve(userAuth);
    });
  });

export const addCollection = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectToAdd: T[]
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  try {
    await batch.commit();
  } catch (err) {
    console.log(err);
  }
};

export const getCollection = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(docSnapshot => docSnapshot.data() as Category);
};
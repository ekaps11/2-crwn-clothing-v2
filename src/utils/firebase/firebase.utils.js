// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBnb80iBDlY-pQP44tVbjDrQt8X2rzm06Y',
  authDomain: 'crwn-clothing-v2-61977.firebaseapp.com',
  projectId: 'crwn-clothing-v2-61977',
  storageBucket: 'crwn-clothing-v2-61977.appspot.com',
  messagingSenderId: '854830301395',
  appId: '1:854830301395:web:1b8f57db0c40957660d426',
};

const app = initializeApp(firebaseConfig); // Initialize Firebase
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

provider.setCustomParameters({
  prompt: 'select_account',
});

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const createUserDocumentFromAuth = async userAuth => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  console.log(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (err) {
      console.log('error while creating document ', err.code);
    }
  }

  return userDocRef;
};

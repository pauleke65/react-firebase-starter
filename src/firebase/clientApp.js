// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from 'firebase/app';
// Add Firebase products you want ot use here
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

// Replace this with your app's configuration from Firebase Console
const firebaseConfig = {
  apiKey: 'AIzaSyAz_JGgkIfTUuNJN-h3Ki5_81PnZYxXU3E',
  authDomain: 'codebusters-firebase-starter.firebaseapp.com',
  projectId: 'codebusters-firebase-starter',
  storageBucket: 'codebusters-firebase-starter.appspot.com',
  messagingSenderId: '143732134018',
  appId: '1:143732134018:web:c46667e8125b1012a6a49b',
};

// firebaseApps previously initialized using initializeApp()
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

if (window.location.hostname === 'localhost') {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099');
}

export { firebaseApp, db, auth };

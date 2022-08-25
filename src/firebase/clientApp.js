// Firebase App (the core Firebase SDK) is always required and must be listed first
import { getApp, initializeApp } from 'firebase/app';
// Add Firebase products you want ot use here
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

// Replace this with your app's configuration from Firebase Console
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// firebaseApps previously initialized using initializeApp()
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const functions = getFunctions(getApp());

if (window.location.hostname === 'localhost') {
  connectFirestoreEmulator(db, "localhost", 8080);
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFunctionsEmulator(functions, "localhost", 5001);
}

export { firebaseApp, db, auth };

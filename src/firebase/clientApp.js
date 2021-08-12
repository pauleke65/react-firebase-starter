// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';

// Add Firebase products that you need here
import 'firebase/auth';
import 'firebase/firestore';

// Replace this with your app's configuration from Firebase Console
const firebaseConfig = {
  apiKey: 'AIzaSyAz_JGgkIfTUuNJN-h3Ki5_81PnZYxXU3E',
  authDomain: 'codebusters-firebase-starter.firebaseapp.com',
  projectId: 'codebusters-firebase-starter',
  storageBucket: 'codebusters-firebase-starter.appspot.com',
  messagingSenderId: '143732134018',
  appId: '1:143732134018:web:c46667e8125b1012a6a49b',
};

firebase.initializeApp(firebaseConfig);

if (window.location.hostname === 'localhost') {
  firebase.auth().useEmulator('http://localhost:9099');
  firebase.firestore().useEmulator('localhost', 8080);
}

export default firebase;

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

// Use your own configs!
const app = firebase.initializeApp({
  apiKey: "AIzaSyCqG_1hm7AJN58pyBj_lbMecOtwP2NXbzQ",
  authDomain: "taxis-stackblitz.firebaseapp.com",
  projectId: "taxis-stackblitz",
  storageBucket: "taxis-stackblitz.appspot.com",
  messagingSenderId: "977311415632",
  appId: "1:977311415632:web:c4a419e65259ff87fa8055"
});

export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export const firestoreApp = app.firestore();
export const storageApp = app.storage();
export const authApp = app.auth();



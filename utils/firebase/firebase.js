// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { getAuth, setPersistence } from 'firebase/compat/auth';
import { browserLocalPersistence } from 'firebase/compat/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

db.settings = ({
  timestampsInSnapshots: true,
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
  cacheExpirationSeconds: 2592000,
})

const auth = firebase.auth();

auth.signInAnonymously()
  .then((userCredential) => {
    const user = userCredential.user;
    console.log('Anonymous user logged in: ', user.uid);
  })
  .catch((error) => {
    console.error('Error logging in anonymously: ', error);
  });


export { db };
// export { user };

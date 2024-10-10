// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import { getFirestore } from 'firebase/firestore'; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBkcEUhol2-Iljh82NFEWHqzHgK89L-Pj0",
  authDomain: "julie-lq5xdo.firebaseapp.com",
  projectId: "julie-lq5xdo",
  storageBucket: "julie-lq5xdo.appspot.com",
  messagingSenderId: "732470815723",
  appId: "1:732470815723:web:777eb87ab84f45eda2c7ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);  // Initialize Firebase Authentication
const db = getFirestore(app);  // Initialize Firestore

export { auth, db };  // Export named exports


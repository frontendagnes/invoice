// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import firebase from 'firebase/compat/app';
// import "firebase/compat/database";
// import "firebase/compat/firestore";
// import "firebase/compat/auth";

import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  onSnapshot,
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  addDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTFvLXCKU5Sk3BfdqWHmvswXZE9ok2YIw",
  authDomain: "invoice-939f8.firebaseapp.com",
  projectId: "invoice-939f8",
  storageBucket: "invoice-939f8.appspot.com",
  messagingSenderId: "700239820793",
  appId: "1:700239820793:web:290773277b948fa65f2f28",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
// const auth = firebase.auth();

export {
  auth,
  db,
  onSnapshot,
  collection,
  doc,
  onAuthStateChanged,
  orderBy,
  query,
  setDoc,
  addDoc,
  increment,
  updateDoc,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
// export default db;

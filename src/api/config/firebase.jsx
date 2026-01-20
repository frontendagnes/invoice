// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
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
  deleteDoc,
  getDocs,
  getDoc,
  where,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

// Your web app's Firebase configuration
import { firebaseConfig, firebaseConfigTest } from "./config";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider(firebaseApp);

export {
  db,
  auth,
  provider,
  storage,
  signInWithPopup,
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
  deleteDoc,
  getDocs,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
  getDoc,
  sendPasswordResetEmail,
  where,
};

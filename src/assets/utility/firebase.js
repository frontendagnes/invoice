// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
  deleteDoc,
  getDocs,
} from "firebase/firestore";
// Your web app's Firebase configuration
import { firebaseConfig } from "./config";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

// export const getCosts = (dispatch, user) => {
//   const docRef = doc(db, "invoices", user?.uid)
//   const ref = collection(docRef, "costs")
//   if (user) {
//     try {
//       getDocs(ref).then((snapshot) => {
//         dispatch({
//           type: "SET_COSTS",
//           item: snapshot.docs.map((doc) => ({
//             id: doc.id,
//             data: doc.data(),
//           })),
//         });
//       });
//     } catch (error) {
//       console.log("err>>", error);
//     }
//   }
// };

export {
  db,
  auth,
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
};

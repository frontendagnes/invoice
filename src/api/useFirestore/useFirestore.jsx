import { useState } from "react";
import {
  db,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  setDoc,
  onSnapshot,
  query,
  where,
} from "@/assets/utility/firebase";
import { useStateValue } from "../../assets/utility/StateProvider";
import { useHelpers } from "./helpers";

const useFirestore = (collectionName) => {
  const [loading, setLoading] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [errorFirestore, setErrorFirestore] = useState(null);
  const [{ user }, dispatch] = useStateValue();
  const {
    handleFirestoreError,
    handleFirestoreLoadingSet,
    handleFirestoreLoadingUnset,
  } = useHelpers(setLoading);

  /**
   * Subskrybuje dane z podkolekcji w Firestore.
   * @param {string} table - Nazwa kolekcji podrzędnej.
   * @param {string|null} type - Typ akcji do dispatch (opcjonalnie).
   * @param {Function|null} mapFn - Funkcja mapująca dane (opcjonalnie).
   * @param {Function|null} setState - Funkcja setState (opcjonalnie).
   * @returns {Function} - Funkcja anulująca subskrypcję.
   */
  const getData = async (table, type = null, mapFn = null, setState = null) => {
    handleFirestoreLoadingSet();
    setErrorFirestore(null);
    try {
      const docRef = doc(db, collectionName, user?.uid);
      const ref = collection(docRef, table);
      const unsubscribe = onSnapshot(ref, (snap) => {
        const result = mapFn
          ? mapFn(snap)
          : snap.docs.map((doc) => ({ id: doc.id, data: doc.data() }));

        if (setState) {
          setState(result);
        } else if (type) {
          dispatch({ type, item: result });
        } else {
          console.warn(
            "Neither setState nor dispatch type provided in getData."
          );
        }
      });
      return unsubscribe;
    } catch (error) {
      setErrorFirestore(error.message);
      handleFirestoreError(error.message);
    } finally {
      handleFirestoreLoadingUnset();
    }
  };

  /**
   * Aktualizuje jedno pole w dokumencie.
   * @param {string} table - Nazwa kolekcji podrzędnej.
   * @param {string} id - ID dokumentu.
   * @param {Object} data - Dane do zapisania.
   * @param {string} name - Nazwa pola do zaktualizowania.
   * @returns {Promise<Object|null>} - Zaktualizowany dokument lub null.
   */
  const setDocumentField = async (table, id, data, name) => {
    handleFirestoreLoadingSet();
    setErrorFirestore(null);
    try {
      const ref = doc(db, collectionName, user.uid, table, id);
      await setDoc(ref, { [name]: { ...data } });
      const docSnapshot = await getDoc(ref);
      if (docSnapshot.exists()) {
        return { id: docSnapshot.id, ...docSnapshot.data() };
      }
    } catch (err) {
      setErrorFirestore(err.message);
      handleFirestoreError(err.message);
      return null;
    } finally {
      handleFirestoreLoadingUnset();
    }
  };

  /**
   * Nadpisuje cały dokument (lub tworzy nowy).
   * @param {string} table - Nazwa kolekcji podrzędnej.
   * @param {string} id - ID dokumentu.
   * @param {Object} data - Pełna zawartość dokumentu.
   * @returns {Promise<Object|null>} - Zaktualizowany dokument lub null.
   */
  const setDocument = async (table, id, data) => {
    handleFirestoreLoadingSet();
    setErrorFirestore(null);
    try {
      const ref = doc(db, collectionName, user.uid, table, id);
      await setDoc(ref, data);
      const docSnapshot = await getDoc(ref);
      if (docSnapshot.exists()) {
        return { id: docSnapshot.id, ...docSnapshot.data() };
      }
      dispatch({
        type: "ALERT_SUCCESS",
        item: `Aktualizacja przebiegła poprawnie`,
      });
    } catch (err) {
      setErrorFirestore(err.message);
      handleFirestoreError(err.message);
      return null;
    } finally {
      handleFirestoreLoadingUnset();
    }
  };

  /**
   * Nadpisuje wszystkie pola w obiekcie sprzedawcy.
   * @param {Object} property - Obiekt zawierający dane sprzedawcy.
   * @param {Object} user - Obiekt użytkownika z UID.
   * @param {string} table - Nazwa kolekcji podrzędnej.
   * @param {string} [sellerId="item-seller123"] - ID dokumentu sprzedawcy.
   * @returns {Promise<void>}
   */
  const updateSellerAll = async (
    property,
    user,
    table,
    sellerId = "item-seller123"
  ) => {
    handleFirestoreLoadingSet();
    setErrorFirestore(null);
    const refSeller = doc(db, collectionName, user.uid, table, sellerId);
    try {
      await setDoc(refSeller, { seller: { ...property } });
      dispatch({
        type: "ALERT_SUCCESS",
        item: `Aktualizacja przebiegła poprawnie`,
      });
    } catch (error) {
      setErrorFirestore(error.message);
      handleFirestoreError(error.message);
    } finally {
      handleFirestoreLoadingUnset();
    }
  };

  /**
   * Aktualizuje jedno pole w obiekcie sprzedawcy.
   * @param {string} field - Nazwa pola.
   * @param {string} value - Nowa wartość.
   * @param {Object} user - Obiekt użytkownika.
   * @param {string} table - Nazwa kolekcji podrzędnej.
   * @param {string} [sellerId="item-seller123"] - ID dokumentu sprzedawcy.
   * @returns {Promise<void>}
   */
  const updateSellerField = async (
    field,
    value,
    user,
    table,
    sellerId = "item-seller123"
  ) => {
    handleFirestoreLoadingSet();
    setErrorFirestore(null);
    const refSeller = doc(db, collectionName, user.uid, table, sellerId);
    try {
      await setDoc(refSeller, { seller: { [field]: value } }, { merge: true });
      dispatch({
        type: "ALERT_SUCCESS",
        item: `Aktualizacja ${field.toUpperCase()} przebiegła poprawnie`,
      });
    } catch (error) {
      setErrorFirestore(error.message);
      handleFirestoreError(error.message);
    } finally {
      handleFirestoreLoadingUnset();
    }
  };

  /**
   * Aktualizuje dokument jeśli istnieje, lub wstawia dane jeśli nie istnieje.
   * @param {string} table - Nazwa kolekcji (opcjonalnie null).
   * @param {string} id - ID dokumentu.
   * @param {Object} dataExist - Dane do aktualizacji jeśli istnieje.
   * @param {Object} dataNoExist - Dane do aktualizacji jeśli nie istnieje.
   * @returns {Promise<boolean>} - Czy operacja zakończyła się sukcesem.
   */
  const updateDocument = async (table, id, dataExist, dataNoExist) => {
    handleFirestoreLoadingSet();
    setErrorFirestore(null);
    try {
      const docRef = table
        ? doc(db, collectionName, user.uid, table, id)
        : doc(db, collectionName, user.uid, id);

      const docSnap = await getDoc(docRef);
      const docExist = docSnap.exists();
      await updateDoc(docRef, docExist ? dataExist : dataNoExist);
      return true;
    } catch (err) {
      setErrorFirestore(err.message);
      handleFirestoreError(err.message);
      return false;
    } finally {
      handleFirestoreLoadingUnset();
    }
  };

  /**
   * Dodaje nowy dokument do kolekcji.
   * @param {Object} data - Dane nowego dokumentu.
   * @param {string} table - Nazwa kolekcji podrzędnej.
   * @returns {Promise<void>}
   */
  const addDocument = async (data, table) => {
    setLoadingAdd(true);
    dispatch({ type: "SET_GLOBAL_LOADING" });
    setErrorFirestore(null);
    try {
      const docRef = doc(db, collectionName, user.uid);
      const ref = collection(docRef, table);
      await addDoc(ref, data);
    } catch (err) {
      setErrorFirestore(err.message);
      handleFirestoreError(err.message);
      throw err;
    } finally {
      setLoadingAdd(false);
      dispatch({ type: "UNSET_GLOBAL_LOADING" });
    }
  };

  /**
   * Usuwa dokument z kolekcji.
   * @param {string} table - Nazwa kolekcji podrzędnej.
   * @param {string} id - ID dokumentu.
   * @returns {Promise<void>}
   */
  const deleteDocument = async (table, id) => {
    handleFirestoreLoadingSet();
    setErrorFirestore(null);
    try {
      await deleteDoc(doc(db, collectionName, user.uid, table, id));
    } catch (err) {
      setErrorFirestore(err.message);
      handleFirestoreError(err.message);
    } finally {
      handleFirestoreLoadingUnset();
    }
  };

  /**
   * Sprawdza istnienie dokumentu na podstawie pola i wartości.
   * @param {string} field - Nazwa pola.
   * @param {string|number} value - Wartość pola.
   * @param {string} table - Nazwa kolekcji podrzędnej.
   * @returns {Promise<boolean>} - Czy dokument istnieje.
   */
  const findDocumentByField = async (field, value, table) => {
    handleFirestoreLoadingSet();
    setErrorFirestore(null);
    try {
      const userDocRef = doc(db, collectionName, user.uid);
      const contractorsCollectionRef = collection(userDocRef, table);
      const snapshot = await getDocs(
        query(contractorsCollectionRef, where(field, "==", value))
      );
      return !snapshot.empty;
    } catch (error) {
      console.error("Błąd wyszukiwania dokumentu:", error);
      setErrorFirestore(error.message);
      return false;
    } finally {
      handleFirestoreLoadingUnset();
    }
  };
  const getCollectionDocsOnce = async (subCollectionName, queryFn = null) => {
    handleFirestoreLoadingSet();
    setErrorFirestore(null);
    try {
      if (!user?.uid) {
        console.warn(
          "getCollectionDocsOnce: User ID not available. Cannot fetch data."
        );
        return { empty: true, size: 0, docs: [] }; // Zwróć obiekt symulujący pusty snapshot
      }

      const docRef = doc(db, collectionName, user.uid); // Nadrzędny dokument użytkownika
      let collectionRef = collection(docRef, subCollectionName); // Subkolekcja (np. "invoiceCorrections")

      if (queryFn) {
        collectionRef = queryFn(collectionRef); // Zastosuj wszelkie zapytania (np. orderBy)
      }

      const querySnapshot = await getDocs(collectionRef); // <-- Użyj getDocs

      handleFirestoreLoadingUnset();
      return querySnapshot; // Zwróć cały QuerySnapshot
    } catch (error) {
      setErrorFirestore(error.message);
      handleFirestoreError(error.message);
      handleFirestoreLoadingUnset();
      console.error(
        `Błąd w getCollectionDocsOnce dla kolekcji ${subCollectionName}:`,
        error
      );
      throw error; // Rzuć błąd, aby wyższa warstwa mogła go obsłużyć
    }
  };

  return {
    loading,
    loadingAdd,
    errorFirestore,
    getData,
    setDocumentField,
    setDocument,
    updateSellerField,
    updateSellerAll,
    addDocument,
    updateDocument,
    deleteDocument,
    findDocumentByField,
    getCollectionDocsOnce,
  };
};

export default useFirestore;

// import { useState } from "react";
// import {
//   db,
//   collection,
//   doc,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   getDocs,
//   getDoc,
//   setDoc,
//   onSnapshot,
//   query,
//   where,
// } from "@/assets/utility/firebase";
// import { useStateValue } from "../../assets/utility/StateProvider";
// import { useHelpers } from "./helpers";
// const useFirestore = (collectionName) => {
//   const [loading, setLoading] = useState(false);
//   const [loadingAdd, setLoadingAdd] = useState(false);
//   const [errorFirestore, setErrorFirestore] = useState(null);
//   const [{ user }, dispatch] = useStateValue();
//   const {
//     handleFirestoreError,
//     handleFirestoreLoadingSet,
//     handleFirestoreLoadingUnset,
//   } = useHelpers(setLoading);

//   const getData = async (table, type = null, mapFn = null, setState = null) => {
//     // pobiera dane z bazy
//     handleFirestoreLoadingSet();
//     setErrorFirestore(null);

//     try {
//       const docRef = doc(db, collectionName, user?.uid);
//       const ref = collection(docRef, table);

//       const unsubscribe = onSnapshot(ref, (snap) => {
//         const result = mapFn
//           ? mapFn(snap)
//           : snap.docs.map((doc) => ({
//               id: doc.id,
//               data: doc.data(),
//             }));

//         if (setState) {
//           setState(result); // jeśli podano funkcję setState -> używamy useState
//         } else if (type) {
//           dispatch({
//             type: type,
//             item: result, // jeśli podano type -> wysyłamy do globalnego state
//           });
//         } else {
//           console.warn(
//             "Neither setState nor dispatch type provided in getData."
//           );
//         }
//       });
//       return unsubscribe;
//     } catch (error) {
//       setErrorFirestore(error.message);
//       handleFirestoreError(error.message);
//     } finally {
//       handleFirestoreLoadingUnset();
//     }
//   };

//   const setDocumentField = async (table, id, data, name) => {
//     // aktualizuje pole w dokumencie
//     handleFirestoreLoadingSet();
//     setErrorFirestore(null);
//     try {
//       const ref = doc(db, collectionName, user.uid, table, id);
//       await setDoc(ref, { [name]: { ...data } });

//       const docSnapshot = await getDoc(ref);
//       if (docSnapshot.exists()) {
//         return {
//           id: docSnapshot.id,
//           ...docSnapshot.data(),
//         };
//       }
//     } catch (err) {
//       setErrorFirestore(err.message);
//       handleFirestoreError(err.message);
//       return null;
//     } finally {
//       handleFirestoreLoadingUnset();
//     }
//   };

//   const setDocument = async (table, id, data) => {
//     // aktualizuje dokument w kolekcji
//     // Tworzy nowy dokument, jeśli dokument o podanym ID nie istnieje.
//     // Nadpisuje istniejący dokument wszystkimi danymi, które przekazujesz. Jeśli w data brakuje pól, które istniały wcześniej w dokumencie, te pola zostaną usunięte.
//     handleFirestoreLoadingSet();
//     setErrorFirestore(null);
//     try {
//       const ref = doc(db, collectionName, user.uid, table, id);
//       await setDoc(ref, data);

//       const docSnapshot = await getDoc(ref);
//       if (docSnapshot.exists()) {
//         return {
//           id: docSnapshot.id,
//           ...docSnapshot.data(),
//         };
//       }
//       dispatch({
//         type: "ALERT_SUCCESS",
//         item: `Aktualizacja przebiegła poprawnie`,
//       });
//     } catch (err) {
//       setErrorFirestore(err.message);
//       handleFirestoreError(err.message);
//       return null;
//     } finally {
//       handleFirestoreLoadingUnset();
//     }
//   };

//   const updateSellerAll = async (
//     property,
//     user,
//     table,
//     sellerId = "item-seller123"
//   ) => {
//     // aktualizuje wszystkie pola w dokumencie sprzedawcy
//     handleFirestoreLoadingSet();
//     setErrorFirestore(null);
//     const refSeller = doc(db, collectionName, user.uid, table, sellerId);

//     try {
//       await setDoc(refSeller, {
//         seller: {
//           name: property.name,
//           street: property.street,
//           zipcode: property.zipcode,
//           town: property.town,
//           nip: property.nip,
//         },
//       });
//       dispatch({
//         type: "ALERT_SUCCESS",
//         item: `Aktualizacja przebiegła poprawnie`,
//       });
//     } catch (error) {
//       setErrorFirestore(error.message);
//       handleFirestoreError(error.message);
//     } finally {
//       handleFirestoreLoadingUnset();
//     }
//   };

//   const updateSellerField = async (
//     field,
//     value,
//     user,
//     table,
//     sellerId = "item-seller123"
//   ) => {
//     // aktualizuje pole w dokumencie sprzedawcy
//     handleFirestoreLoadingSet();
//     setErrorFirestore(null);

//     const refSeller = doc(db, collectionName, user.uid, table, sellerId);
//     try {
//       await setDoc(refSeller, { seller: { [field]: value } }, { merge: true });
//       dispatch({
//         type: "ALERT_SUCCESS",
//         item: `Aktualizacja ${field.toUpperCase()} przebiegła poprawnie`,
//       });
//     } catch (error) {
//       setErrorFirestore(error.mesage);
//       handleFirestoreError(error.message);
//     } finally {
//       handleFirestoreLoadingUnset();
//     }
//   };

//   const updateDocument = async (table, id, dataExist, dataNoExist) => {
//     // aktualizuje dokument w kolekcji
//     // Aktualizuje istniejący dokument. Jeśli dokument o podanym ID nie istnieje, updateDoc zwróci błąd.
//     handleFirestoreLoadingSet();
//     setErrorFirestore(null);
//     try {
//       let docRef;
//       if (table) {
//         docRef = doc(db, collectionName, user.uid, table, id);
//       } else {
//         docRef = doc(db, collectionName, user.uid, id);
//       }
//       const docSnap = await getDoc(docRef);
//       const docExist = docSnap.exists();
//       if (docExist) {
//         await updateDoc(docRef, dataExist);
//       } else {
//         await updateDoc(docRef, dataNoExist);
//       }
//       return true;
//     } catch (err) {
//       setErrorFirestore(err.message);
//       handleFirestoreError(err.message);
//       return false;
//     } finally {
//       handleFirestoreLoadingUnset();
//     }
//   };

//   const addDocument = async (data, table) => {
//     // dodaje dokument do kolekcji
//     setLoadingAdd(true);
//     dispatch({ type: "SET_GLOBAL_LOADING" });
//     setErrorFirestore(null);
//     try {
//       const docRef = doc(db, collectionName, user.uid);
//       const ref = collection(docRef, table);
//       await addDoc(ref, data);
//     } catch (err) {
//       setErrorFirestore(err.message);
//       handleFirestoreError(err.message);
//       throw err;
//     } finally {
//       setLoadingAdd(false);
//       dispatch({ type: "UNSET_GLOBAL_LOADING" });
//     }
//   };

//   const deleteDocument = async (table, id) => {
//     //usuwanie dokumentu z kolekcji
//     handleFirestoreLoadingSet();
//     setErrorFirestore(null);
//     try {
//       await deleteDoc(doc(db, collectionName, user.uid, table, id));
//     } catch (err) {
//       setErrorFirestore(err.message);
//       handleFirestoreError(err.message);
//     } finally {
//       handleFirestoreLoadingUnset();
//     }
//   };

//   const findDocumentByField = async (field, value, table) => {
//     // sprawdza czy w kolekcji istnieje dokument z danym polem i wartością
//     handleFirestoreLoadingSet();
//     setErrorFirestore(null);
//     try {
//       const userDocRef = doc(db, collectionName, user.uid);
//       const contractorsCollectionRef = collection(userDocRef, table);
//       const snapshot = await getDocs(
//         query(contractorsCollectionRef, where(field, "==", value))
//       );
//       return !snapshot.empty; // Zwraca true, jeśli dokument istnieje
//     } catch (error) {
//       console.error("Błąd wyszukiwania dokumentu:", error);
//       setErrorFirestore(error.message);
//       return false;
//     } finally {
//       handleFirestoreLoadingUnset();
//     }
//   };

//   return {
//     loading,
//     loadingAdd,
//     errorFirestore,
//     getData,
//     setDocumentField,
//     setDocument,
//     updateSellerField,
//     updateSellerAll,
//     addDocument,
//     updateDocument,
//     deleteDocument,
//     findDocumentByField,
//   };
// };

// export default useFirestore;

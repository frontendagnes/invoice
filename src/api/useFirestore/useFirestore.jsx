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

  const getData = async (table, type = null, mapFn = null, setState = null) => {
    // pobiera dane z bazy
    handleFirestoreLoadingSet();
    setErrorFirestore(null);

    try {
      const docRef = doc(db, collectionName, user?.uid);
      const ref = collection(docRef, table);

      const unsubscribe = onSnapshot(ref, (snap) => {
        const result = mapFn
          ? mapFn(snap)
          : snap.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }));

        if (setState) {
          setState(result); // jeśli podano funkcję setState -> używamy useState
        } else if (type) {
          dispatch({
            type: type,
            item: result, // jeśli podano type -> wysyłamy do globalnego state
          });
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

  const setDocumentField = async (table, id, data, name) => {
    // aktualizuje pole w dokumencie
    handleFirestoreLoadingSet();
    setErrorFirestore(null);
    try {
      const ref = doc(db, collectionName, user.uid, table, id);
      await setDoc(ref, { [name]: { ...data } });

      const docSnapshot = await getDoc(ref);
      if (docSnapshot.exists()) {
        return {
          id: docSnapshot.id,
          ...docSnapshot.data(),
        };
      }
    } catch (err) {
      setErrorFirestore(err.message);
      handleFirestoreError(err.message);
      return null;
    } finally {
      handleFirestoreLoadingUnset();
    }
  };

  const setDocument = async (table, id, data) => {
    // aktualizuje dokument w kolekcji
    // Tworzy nowy dokument, jeśli dokument o podanym ID nie istnieje.
    // Nadpisuje istniejący dokument wszystkimi danymi, które przekazujesz. Jeśli w data brakuje pól, które istniały wcześniej w dokumencie, te pola zostaną usunięte.
    handleFirestoreLoadingSet();
    setErrorFirestore(null);
    try {
      const ref = doc(db, collectionName, user.uid, table, id);
      await setDoc(ref, data);

      const docSnapshot = await getDoc(ref);
      if (docSnapshot.exists()) {
        return {
          id: docSnapshot.id,
          ...docSnapshot.data(),
        };
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

  const updateSellerAll = async (
    property,
    user,
    table,
    sellerId = "item-seller123"
  ) => {
    // aktualizuje wszystkie pola w dokumencie sprzedawcy
    handleFirestoreLoadingSet();
    setErrorFirestore(null);
    const refSeller = doc(db, collectionName, user.uid, table, sellerId);

    try {
      await setDoc(refSeller, {
        seller: {
          name: property.name,
          street: property.street,
          zipcode: property.zipcode,
          town: property.town,
          nip: property.nip,
        },
      });
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

  const updateSellerField = async (
    field,
    value,
    user,
    table,
    sellerId = "item-seller123"
  ) => {
    // aktualizuje pole w dokumencie sprzedawcy
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
      setErrorFirestore(error.mesage);
      handleFirestoreError(error.message);
    } finally {
      handleFirestoreLoadingUnset();
    }
  };

  const updateDocument = async (table, id, dataExist, dataNoExist) => {
    // aktualizuje dokument w kolekcji
    // Aktualizuje istniejący dokument. Jeśli dokument o podanym ID nie istnieje, updateDoc zwróci błąd.
    handleFirestoreLoadingSet();
    setErrorFirestore(null);
    try {
      let docRef;
      if (table) {
        docRef = doc(db, collectionName, user.uid, table, id);
      } else {
        docRef = doc(db, collectionName, user.uid, id);
      }
      const docSnap = await getDoc(docRef);
      const docExist = docSnap.exists();
      if (docExist) {
        await updateDoc(docRef, dataExist);
      } else {
        await updateDoc(docRef, dataNoExist);
      }
      return true;
    } catch (err) {
      setErrorFirestore(err.message);
      handleFirestoreError(err.message);
      return false;
    } finally {
      handleFirestoreLoadingUnset();
    }
  };

  const addDocument = async (data, table) => {
    // dodaje dokument do kolekcji
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

  const deleteDocument = async (table, id) => {
    //usuwanie dokumentu z kolekcji
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

  const findDocumentByField = async (field, value, table) => {
    // sprawdza czy w kolekcji istnieje dokument z danym polem i wartością
    handleFirestoreLoadingSet();
    setErrorFirestore(null);
    try {
      const userDocRef = doc(db, collectionName, user.uid);
      const contractorsCollectionRef = collection(userDocRef, table);
      const snapshot = await getDocs(
        query(contractorsCollectionRef, where(field, "==", value))
      );
      return !snapshot.empty; // Zwraca true, jeśli dokument istnieje
    } catch (error) {
      console.error("Błąd wyszukiwania dokumentu:", error);
      setErrorFirestore(error.message);
      return false;
    } finally {
      handleFirestoreLoadingUnset();
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
  };
};

export default useFirestore;

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
  where
} from "@/assets/utility/firebase";
import { useStateValue } from "../../assets/utility/StateProvider";

const useFirestore = (collectionName) => {
  const [loading, setLoading] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [errorFirestore, setErrorFirestore] = useState(null);
  const [{ user }, dispatch] = useStateValue();

  const handleFirestoreError = (error) => {
    dispatch({ type: "ALERT__ERROR", item: error.message });
  };

  const getData = async (table, type) => {
    setLoading(true);
    setErrorFirestore(null);
    try {
      const docRef = doc(db, collectionName, user?.uid);
      const ref = collection(docRef, table);
      onSnapshot(ref, (snap) => {
        dispatch({
          type: type,
          item: snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        });
      });
    } catch (error) {
      setErrorFirestore(error.message);
      handleFirestoreError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const setDocumentField = async (table, id, data, name) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const setDocument = async (table, id, data) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const updateSellerAll = async (
    property,
    user,
    table,
    sellerId = "item-seller123"
  ) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const updateSellerField = async (
    field,
    value,
    user,
    table,
    sellerId = "item-seller123"
  ) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  // const updateDocument = async (table, id){
  //   setLoading(true)
  //   setError(null)
  //   try{
  //     const updateRef = doc(db, collectionName)

  //   }catch (err) {
  //     setError(err.message);
  //     return false;
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const updateDocument = async (table, id, dataExist, dataNoExist) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const addDocument = async (data, table) => {
    setLoadingAdd(true);
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
    }
  };

  const deleteDocument = async (table, id) => {
    setLoading(true);
    setErrorFirestore(null);
    try {
      await deleteDoc(doc(db, collectionName, user.uid, table, id));
    } catch (err) {
      setErrorFirestore(err.message);
      handleFirestoreError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const findDocumentByField = async (field, value, table) => {
    setLoading(true);
    setErrorFirestore(null);
    try {
      // Utwórz referencję do dokumentu użytkownika
      const userDocRef = doc(db, collectionName, user.uid);
      // Utwórz referencję do subkolekcji 'contractors' w tym dokumencie
      const contractorsCollectionRef = collection(userDocRef, table);
      // Wykonaj zapytanie w subkolekcji 'contractors'
      const snapshot = await getDocs(
        query(contractorsCollectionRef, where(field, "==", value))
      );
      console.log(">>>>", snapshot.docs);

      return !snapshot.empty; // Zwraca true, jeśli dokument istnieje
    } catch (error) {
      console.error("Błąd wyszukiwania dokumentu:", error);
      setErrorFirestore(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  // const getDocuments = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const querySnapshot = await getDocs(collection(db, collectionName));
  //     const documents = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     return documents;
  //   } catch (err) {
  //     setError(err.message);
  //     return []; // Zwróć pustą tablicę w przypadku błędu
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const getDocument = async (id) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const docSnapshot = await getDoc(doc(db, collectionName, id));
  //     if (docSnapshot.exists()) {
  //       return {
  //         id: docSnapshot.id,
  //         ...docSnapshot.data(),
  //       };
  //     } else {
  //       return null; // Zwróć null, jeśli dokument nie istnieje
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //     return null; // Zwróć null w przypadku błędu
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
    // getDocuments,
    // getDocument,
  };
};

export default useFirestore;

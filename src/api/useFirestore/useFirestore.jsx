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
} from "@/assets/utility/firebase";

 const useFirestore = (collectionName) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addDocument = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await addDoc(collection(db, collectionName), data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateDocument = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      await updateDoc(doc(db, collectionName, id), data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return documents;
    } catch (err) {
      setError(err.message);
      return []; // Zwróć pustą tablicę w przypadku błędu
    } finally {
      setLoading(false);
    }
  };

  const getDocument = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const docSnapshot = await getDoc(doc(db, collectionName, id));
      if (docSnapshot.exists()) {
        return {
          id: docSnapshot.id,
          ...docSnapshot.data(),
        };
      } else {
        return null; // Zwróć null, jeśli dokument nie istnieje
      }
    } catch (err) {
      setError(err.message);
      return null; // Zwróć null w przypadku błędu
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    addDocument,
    updateDocument,
    deleteDocument,
    getDocuments,
    getDocument,
  };
};

export default useFirestore
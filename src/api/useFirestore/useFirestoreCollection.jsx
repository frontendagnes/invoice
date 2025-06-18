import { useEffect, useState } from "react";
import { db, collection, onSnapshot, doc } from "../config/firebase";
import { useStateValue } from "../../state/StateProvider";

export const useFirestoreCollection = (
  collectionName,
  table,
  mapFn = null,
  queryFn = null,
  isError = false
) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (!user) {
      setData([]);
      setLoading(false);
      dispatch({ type: "UNSET_GLOBAL_LOADING" });
      return;
    }
    dispatch({ type: "SET_GLOBAL_LOADING" });
    setLoading(true);
    setError(null);

    const docRef = doc(db, collectionName, user?.uid);
    let ref = collection(docRef, table);

    if (queryFn) {
      ref = queryFn(ref);
    }

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const result = mapFn
          ? mapFn(snapshot)
          : snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

        setData(result);
        setLoading(false);
        dispatch({ type: "UNSET_GLOBAL_LOADING" });
      },
      (err) => {
        console.error("Firestore listen error:", err);
        if (isError) {
          setError(err.message || "Unknown error");
        } else {
          dispatch({ type: "ALERT__ERROR", item: err.message });
        }
        setLoading(false);
        dispatch({ type: "UNSET_GLOBAL_LOADING" });
      }
    );

    return () => unsubscribe();
  }, [collectionName, table, user, mapFn, queryFn]); // Dodano table i queryFn do zależności

  return { data, loading, error };
};

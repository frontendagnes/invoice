import { useEffect, useState } from "react";
import { db, collection, onSnapshot, doc } from "../../assets/utility/firebase";
import { useStateValue } from "../../assets/utility/StateProvider";

export const useFirestoreCollection = (
  collectionName,
  table,
  mapFn = null,
  queryFn = null
) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [{ user }] = useStateValue();

  useEffect(() => {
    if (!user) {
      setData([]);
      setLoading(false);
      return;
    }

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
      },
      (err) => {
        console.error("Firestore listen error:", err);
        setError(err.message || "Unknown error");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, table, user, mapFn, queryFn]); // Dodano table i queryFn do zależności

  return { data, loading, error };
};

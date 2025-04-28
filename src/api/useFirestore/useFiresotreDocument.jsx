import { useEffect, useState } from "react";
import { db,  onSnapshot, doc } from "../../assets/utility/firebase";

export const useFirestoreDocument = (path, userId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const ref = doc(db, path, userId);

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        setData(
          snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
        );
        setLoading(false);
      },
      (err) => {
        console.error("Firestore doc listen error:", err);
        setError(err.message || "Unknown error");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [path, userId]);

  return { data, loading, error };
};

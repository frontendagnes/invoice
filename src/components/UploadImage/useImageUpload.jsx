import { useCallback, useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  setDoc,
  doc,
  storage,
  db,
} from "../../assets/utility/firebase";
import { useStateValue } from "../../assets/utility/StateProvider";
import { useHelpers } from "../../api/useFirestore/helpers";

const useImageUpload = () => {
  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
  const [errorFirestore, setErrorFirestore] = useState(null);
  const {
    handleFirestoreError,
    handleFirestoreLoadingSet,
    handleFirestoreLoadingUnset,
  } = useHelpers(setLoading);
 
  const uploadImage = useCallback(
    (file, onProgress) => {
      handleFirestoreLoadingSet();
      setErrorFirestore(null);
      return new Promise((resolve) => {
        try {
          const storageRef = ref(storage, `images/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              onProgress?.(progress);
            },
            (error) => {
              setErrorFirestore(error.message);
              handleFirestoreError(error.message);
              dispatch({ type: "ALERT__ERROR", item: error.message });
              handleFirestoreLoadingUnset();
              resolve(null); // nie rzucamy błędu
            },
            async () => {
              try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                await setDoc(
                  doc(db, "invoices", user?.uid, "logo", "item-logo123"),
                  {
                    imageUrl: url,
                    timestamp: new Date(),
                  }
                );

                dispatch({
                  type: "ALERT_SUCCESS",
                  item: "Logo przesłane pomyślnie!",
                });

                resolve(url);
              } catch (error) {
                setErrorFirestore(error.message);
                handleFirestoreError(error.message);
                dispatch({ type: "ALERT__ERROR", item: error.message });
                resolve(null);
              } finally {
                handleFirestoreLoadingUnset();
              }
            }
          );
        } catch (error) {
          setErrorFirestore(error.message);
          handleFirestoreError(error.message);
          dispatch({ type: "ALERT__ERROR", item: error.message });
          handleFirestoreLoadingUnset();
          resolve(null);
        }
      });
    },
    [user, dispatch]
  );

  const deleteImage = useCallback(
    async (imagePath) => {
      if (!imagePath) {
        dispatch({ type: "ALERT__ERROR", item: "Nie ma nic do usunięcia" });
        return;
      }

      const refImg = ref(storage, imagePath);
      const docRef = doc(db, "invoices", user?.uid, "logo", "item-logo123");

      try {
        await deleteObject(refImg);
        await setDoc(docRef, {
          imageUrl: "",
          timestamp: new Date(),
        });

        dispatch({ type: "ALERT_SUCCESS", item: "Logo usunięte pomyślnie!" });
      } catch (error) {
        dispatch({ type: "ALERT__ERROR", item: error.message });
      }
    },
    [user, dispatch]
  );

  return { uploadImage, deleteImage, loading, errorFirestore };
};

export default useImageUpload;

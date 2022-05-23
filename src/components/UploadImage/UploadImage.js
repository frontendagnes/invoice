import { useState, useRef, useEffect } from "react";
import {
  db,
  storage,
  doc,
  setDoc,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "../../assets/utility/firebase";
import { useStateValue } from "../../assets/utility/StateProvider";
import { Button, LinearProgress } from "@mui/material";

function UploadImage() {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [{ user, logo }, dispatch] = useStateValue();

  const fileImgRef = useRef();
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const handleClick = (e) => {
    e.preventDefault();
    fileImgRef.current.click();
  };
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  };
  const formHandler = () => {
    if (!image) {
      dispatch({
        type: "ALERT__ERROR",
        item: "Najpierw wybierz zdjęcie, później zapisz logo",
      });
    }
    removeLogo()
    uploadFiles(image);
  };

  const uploadFiles = (file) => {
    if (!file) return;
    const sotrageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async (url) => {
            await setDoc(
              doc(db, "invoices", user?.uid, "logo", "item-logo123"),
              {
                timestamp: new Date(),
                imageUrl: url,
              }
            )
              .then(() => {
                dispatch({
                  type: "ALERT_SUCCESS",
                  item: "Logo zostało poprawnie dodane",
                });
              })
              .catch((error) =>
                dispatch({ type: "ALERT__ERROR", item: error.message })
              );
              
            setProgress(0);
            setImage(null);
          })
          .catch((error) => console.log("err>>", error.message));
      }
    );
  };
  const removeLogo = async () => {
    if (logo) {
      const refImg = ref(storage, logo);

      const docRef = doc(db, "invoices", user?.uid, "logo", "item-logo123");

      await deleteObject(refImg)
        .then(() => {
          setDoc(docRef, {
            imageUrl: "",
            timestamp: new Date(),
          }).catch((error) =>
            dispatch({ type: "ALERT__ERROR", item: error.message })
          );

          dispatch({
            type: "ALERT_SUCCESS",
            item: "Logo zostało poprawnie usunięte",
          });
        })
        .catch((error) =>
          dispatch({ type: "ALERT__ERROR", item: error.message })
        );
    } else dispatch({ type: "ALERT__ERROR", item: "Nie ma nic do usunięcia" });
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ letterSpacing: "1px" }}>
          Kliknij na logo aby wybrać nowe zdjęcie
        </div>
        <LinearProgress
          color="success"
          variant="determinate"
          value={progress}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            type="file"
            className="input"
            onChange={handleChange}
            accept="image/*"
            ref={fileImgRef}
            style={{ display: "none" }}
          />

          {logo ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                style={{
                  width: "100px",
                  cursor: "pointer",
                  marginBottom: "10px",
                }}
                src={logo}
                alt="logo"
                onClick={handleClick}
              />
              <Button onClick={removeLogo}>Usuń Logo</Button>
            </div>
          ) : (
            <Button onClick={handleClick}>Wybierz Logo</Button>
          )}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {preview ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{
                width: "100px",
                cursor: "pointer",
                marginBottom: "10px",
              }}
              src={preview}
              alt="logo"
              onClick={handleClick}
            />
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setImage(null)}
            >
              Wyczyść Podgląd
            </span>
          </div>
        ) : (
          <div
            style={{
              width: "100px",
              height: "100px",
              marginLeft: "10px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          />
        )}
        {preview ? (
          <Button
            type="button"
            onClick={formHandler}
            style={{ marginLeft: "10px" }}
          >
            Zapisz Logo
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export default UploadImage;

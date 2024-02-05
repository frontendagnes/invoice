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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import styled from "styled-components";

const Close = styled.div`
  cursor: pointer;
  color: #808080;
  position: absolute;
  top: -5px;
  left: -15px;
  font-size: 18px;
  font-weight: 600;
  transition: color 0.75s ease;
  &:hover {
    color: red;
  }
`;
const ButtonR = styled.button`
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.75s ease;
  &:hover {
    background: #bababa;
  }
`;
const ButtonError = styled(ButtonR)`
  color: #ff0000;
`;
const ButtonSuccess = styled(ButtonR)`
  color: #008000;
`;
const Alert = styled.div`
  width: 400px;
  height: 100px;
  background: #000000;
  color: #ffffff;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  z-index: 999;
`;

const Text = styled.div`
  letter-spacing: 2px;
  font-size: 16px;
`;
function UploadImage() {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [remove, setRemove] = useState(false);
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
    if (logo) {
      removeLogo();
    }

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
  const removeLogo = async (e) => {
    e.preventDefault();
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

          setRemove(false);
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
      {remove ? (
        <Alert>
          <Text>Czy jesteś pewień że chcesz trwale usunać Logo</Text>
          <div>
            <ButtonError type="button" onClick={removeLogo}>
              Tak
            </ButtonError>
            <ButtonSuccess type="button" onClick={() => setRemove(false)}>
              Nie
            </ButtonSuccess>
          </div>
        </Alert>
      ) : null}
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
                position: "relative",
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
              <Close onClick={() => setRemove(true)} title="Usuń Logo">
                <DeleteForeverIcon />
              </Close>
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

import { useState, useEffect, useRef } from "react";
import { Button, LinearProgress, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "styled-components";
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

const VisuallyHiddenInput = styled.input`
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-grow: 1;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 10px;
  z-index:1000;
`;

const UploadedImage = styled.img`
  width: 150px;
  height: auto;
  cursor: pointer;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  position: absolute;
  top: -100px;
`;
const ButtonR = styled.button`
  margin-left: 10px;
  letter-spacing: 2px;
  padding: 10px 20px;
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
  width: 70%;
  height: 100px;
  background:rgba(0, 0, 0, 0.68);
  color:rgb(255, 255, 255);
  padding: 20px 40px;
  border-radius: 5px ;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  z-index: 1001;
`;

function UploadLogo() {
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [remove, setRemove] = useState(false);
  const [{ user, logo }, dispatch] = useStateValue();
  const fileInputRef = useRef();

  useEffect(() => {
    if (logo) {
      setImageUrl(logo);
    }
  }, [logo]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!imageFile) return;

    const storageRef = ref(storage, `images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => dispatch({ type: "ALERT__ERROR", item: error.message }),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        await setDoc(doc(db, "invoices", user?.uid, "logo", "item-logo123"), {
          timestamp: new Date(),
          imageUrl: url,
        });

        dispatch({ type: "ALERT_SUCCESS", item: "Logo przesłane pomyślnie!" });
        setImageUrl(url);
        setProgress(0);
        setPreview(null);
        setImageFile(null);
      }
    );
  };

  const handleRemovePreview = () => {
    setPreview(null);
    setImageFile(null);
  };

  const confirmRemove = () => {
    setRemove(true);
  };

  const handleDelete = async () => {
    if (logo) {
      const refImg = ref(storage, logo);
      const docRef = doc(db, "invoices", user?.uid, "logo", "item-logo123");

      await deleteObject(refImg)
        .then(() => {
          setDoc(docRef, {
            imageUrl: "",
            timestamp: new Date(),
          });

          dispatch({ type: "ALERT_SUCCESS", item: "Logo usunięte pomyślnie!" });
          setImageUrl(null);
          setRemove(false);
        })
        .catch((error) =>
          dispatch({ type: "ALERT__ERROR", item: error.message })
        );
    } else {
      dispatch({ type: "ALERT__ERROR", item: "Nie ma nic do usunięcia" });
    }
  };

  return (
    <Container>
      {remove ? (
        <Alert>
          <p>Czy na pewno chcesz trwale usunąć logo?</p>
          <div style={{ display: "flex" }}>
            <ButtonError onClick={handleDelete}>Tak</ButtonError>
            <ButtonSuccess onClick={() => setRemove(false)}>Nie</ButtonSuccess>
          </div>
        </Alert>
      ) : null}

      {preview ? (
        <ImageContainer>
          <UploadedImage src={preview} alt="Podgląd" />
          <ActionButtons>
            <Button
              variant="outlined"
              color="success"
              startIcon={<CheckIcon />}
              onClick={handleUpload}
            >
              Zapisz
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleRemovePreview}
            >
              Usuń podgląd
            </Button>
          </ActionButtons>
        </ImageContainer>
      ) : imageUrl ? (
        <ImageContainer>
          <UploadedImage src={imageUrl} alt="Logo" />
          <IconButton
            onClick={confirmRemove}
            color="error"
            sx={{
              position: "absolute",
              right: "-50px",
            }}
          >
            <DeleteIcon />
          </IconButton>
        </ImageContainer>
      ) : (
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload Logo
          <VisuallyHiddenInput
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </Button>
      )}

      {progress > 0 && (
        <LinearProgress
          variant="determinate"
          value={progress}
          style={{ width: "100%", marginTop: "10px" }}
        />
      )}
    </Container>
  );
}

export default UploadLogo;

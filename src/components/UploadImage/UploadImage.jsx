import { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import { useStateValue } from "../../assets/utility/StateProvider";
//mui
import { Button, LinearProgress, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
//components
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Tooltip from "../Tooltip/Tooltip";
import ValidationError from "../ValidationError/ValidationError.jsx";
import useImageUpload from "./useImageUpload.jsx";
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
  z-index: 1000;
`;

const ImageContainerUploaded = styled(ImageContainer)`
  z-index: 0;
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
  background: #ffffff;
  padding: 20px 30px;
  padding-bottom: 0;
  border-radius: 5px;
`;

function UploadLogo() {
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [remove, setRemove] = useState(false);
  const [{ logo }, dispatch] = useStateValue();

  const {
    uploadImage,
    deleteImage,
    loading,
    errorFirestore: error,
  } = useImageUpload();

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

  const handleUpload = async () => {
    if (!imageFile) return;

    const url = await uploadImage(imageFile, setProgress);
    if (url) {
      setImageUrl(url);
    }

    setPreview(null);
    setImageFile(null);
    setPreview(null);
    setProgress(0);
  };

  const handleRemovePreview = () => {
    setPreview(null);
    setImageFile(null);
  };

  const confirmRemove = () => {
    setRemove(true);
  };

  const handleDelete = async () => {
    await deleteImage(imageUrl);
    setImageUrl(null);
    setRemove(false);
  };

  return (
    <Container>
      {remove ? (
        <DeleteConfirmationModal
          isOpen={remove}
          onClickYes={handleDelete}
          onClickNo={() => setRemove(false)}
          item="Logo"
        />
      ) : null}
      <ValidationError text={error} />
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
              {loading ? "Zapisuje" : "Zapisz"}
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
        <ImageContainerUploaded>
          <UploadedImage src={imageUrl} alt="Logo" />
          <IconButton
            onClick={confirmRemove}
            color="error"
            sx={{
              position: "absolute",
              right: "-50px",
            }}
          >
            <Tooltip text="Usuń logo" fontSize="12px" left="40px" bottom="30px">
              <DeleteIcon />
            </Tooltip>
          </IconButton>
        </ImageContainerUploaded>
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

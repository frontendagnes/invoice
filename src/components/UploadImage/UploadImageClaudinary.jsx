import "./uploadImageClaudinary.css";
import { useStateValue } from "../../state/StateProvider";

// mui
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FileUploadIcon from "@mui/icons-material/FileUpload";

// components
import ProgressBar from "../ProgressBar/ProgressBar";
import ImagePreview from "./ImagePreview";
import useCloudinaryUploadLogo from "../../hooks/useCloudinaryUploadLogo";

export default function CloudinaryUpload() {
  const [{ user, logo }, dispatch] = useStateValue();

  const {
    uploading,
    uploadProgress,
    error,
    previewUrl,
    selectedFile,
    handleFileSelect,
    handleUpload,
    handleCancel,
  } = useCloudinaryUploadLogo({ user, dispatch });

  return (
    <div className="uploadImage">
      <form onSubmit={handleUpload} className="uploadImage__form">
        <label htmlFor="imageUploadClaudinary" className="custom-file-upload">
          <CloudUploadIcon />
          {logo ? "Zmień logo" : "Wybierz logo"}
        </label>

        <input
          id="imageUploadClaudinary"
          hidden
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
        />

        <ImagePreview src={previewUrl} onRemove={handleCancel} />

        <ProgressBar uploading={uploading} uploadProgress={uploadProgress} />

        {selectedFile && !uploading && (
          <div className="uploadImage__submitSection">
            <button
              type="submit"
              className="upload-submit-btn"
              disabled={!previewUrl || uploading}
            >
              {uploading ? (
                <>
                  <FileUploadIcon /> Uploading...
                </>
              ) : (
                <>
                  <AddCircleIcon /> Dodaj logo
                </>
              )}
            </button>
          </div>
        )}

        {error && <div className="upload-error-message">{error}</div>}

        {logo && !previewUrl && (
          <div className="logo_uploaded-section">
            <img src={logo} alt="Uploaded logo" />
          </div>
        )}
      </form>
    </div>
  );
}
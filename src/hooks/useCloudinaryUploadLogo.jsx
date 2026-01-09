import { useState, useRef } from "react";
import { setDoc, db, doc } from "../api/config/firebase";

export default function useCloudinaryUploadLogo({ user, dispatch }) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const xhrRef = useRef(null);

  const CLOUD_NAME = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET;

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Plik jest za duży (max 5MB)");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Wybierz plik obrazu");
      return;
    }
    setSelectedFile(file);
    setError("");
    setUploadProgress(0);

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    xhrRef.current?.abort();
    setSelectedFile(null);
    setPreviewUrl("");
    setUploadProgress(0);
    setError("");
    setUploading(false);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Najpierw wybierz zdjęcie");
      return;
    }

    setUploading(true);
    setError("");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", `invoice/${user.uid}/logos`);

    const xhr = new XMLHttpRequest();
    xhrRef.current = xhr;

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        setUploadProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = async () => {
      try {
        if (xhr.status !== 200) throw new Error("Upload failed");

        const data = JSON.parse(xhr.responseText);

        await setDoc(doc(db, "invoices", user.uid, "logo", "item-logo123"), {
          imageUrl: data.secure_url,
          publicId: data.public_id,
          timestamp: new Date(),
        });

        setPreviewUrl("");
        setSelectedFile(null);
        setUploadProgress(100);

        dispatch({
          type: "ALERT_SUCCESS",
          item: "Logo przesłane pomyślnie!",
        });
      } catch (err) {
        setError(err.message);
        dispatch({
          type: "ALERT_ERROR",
          item: "Błąd podczas uploadu logo",
        });
      } finally {
        setUploading(false);
      }
    };

    xhr.onerror = () => {
      setError("Błąd połączenia");
      setUploading(false);
    };

    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    );
    xhr.send(formData);
  };

  return {
    uploading,
    uploadProgress,
    error,
    previewUrl,
    selectedFile,
    handleFileSelect,
    handleUpload,
    handleCancel,
  };
}

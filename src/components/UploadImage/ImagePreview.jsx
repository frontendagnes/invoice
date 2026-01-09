import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function ImagePreview({ src, onRemove }) {
  if (!src) return null;

  return (
    <div className="preview-container">
      <img src={src} alt="Podgląd" className="border-image" />
      <div className="preview-delete-overlay">
        <IconButton
          onClick={onRemove}
          size="small"
          sx={{
            backgroundColor: "var(--white)",
            "&:hover": { backgroundColor: "#fee" },
          }}
          aria-label="Usuń podgląd zdjęcia"
        >
          <DeleteIcon sx={{ color: "#d32f2f" }} />
        </IconButton>
      </div>
    </div>
  );
}

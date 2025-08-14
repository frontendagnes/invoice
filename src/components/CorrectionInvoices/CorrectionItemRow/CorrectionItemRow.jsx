import "./CorrectionItemRow.css";
//mui
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
//components
import CorrectionItemDetails from "./CorrectionItemDetails";
import CorrectionItemForm from "./CorrectionItemForm";
import CorrectionItemSummary from "./CorrectionItemSummary";

function CorrectionItemRow({
  item,
  index,
  handleItemChange,
  onOpenDeleteModal,

}) {
  const { type, title } = item;

  const handleRemoveClick = () => {
    onOpenDeleteModal(index);
  };

  const getCorrectionTypeLabel = (type) => {
    switch (type) {
      case "MODIFICATION":
        return "Modyfikacja";
      case "ADDITION":
        return "Dodanie";
      case "DELETION":
        return "Usunięcie";
      default:
        return "Nieznany";
    }
  };

  return (
    <div
      className="correction-item-row"
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        margin: "10px 0",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      <IconButton
        aria-label="Usuń pozycję"
        onClick={handleRemoveClick}
        style={{ position: "absolute", top: "5px", right: "5px", color: "red" }}
      >
        <DeleteIcon />
      </IconButton>

      <h4>Pozycja Korekty: {title}</h4>
      <p>Typ: {getCorrectionTypeLabel(type)}</p>

      {type === "MODIFICATION" && <CorrectionItemDetails item={item} />}

      <CorrectionItemForm
        item={item}
        handleItemChange={handleItemChange}
        index={index}
      />

      <CorrectionItemSummary item={item} />
    </div>
  );
}

export default CorrectionItemRow;

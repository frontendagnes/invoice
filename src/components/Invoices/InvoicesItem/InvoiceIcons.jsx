import Tooltip from "../../Tooltip/Tooltip";
//mui
import VisibilityIcon from "@mui/icons-material/Visibility";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ConstructionIcon from "@mui/icons-material/Construction";

const InvoiceIcons = ({
  onPreview,
  onEditNote,
  onDelete,
  onCorrection,
  refNoteButton,
  refSettingsButton,
}) => {
  return (
    <div className="invoicesitem__icons">
      <Tooltip text="Podgląd faktury">
        <VisibilityIcon
          onClick={onPreview}
          color="success"
          fontSize="medium"
          titleAccess="Podgląd Faktury"
        />
      </Tooltip>

      <Tooltip text="Dodaj notatkę">
        <span ref={refNoteButton}>
          <EditNoteIcon
            onClick={onEditNote}
            color="primary"
            fontSize="medium"
            titleAccess="Edytuj notatkę"
          />
        </span>
      </Tooltip>

      <Tooltip text="Usuń fakturę">
        <RemoveCircleIcon
          onClick={onDelete}
          color="error"
          fontSize="medium"
          titleAccess="Usuń Fakturę"
        />
      </Tooltip>

      <Tooltip text="Faktury korygujące">
        <span ref={refSettingsButton}>
          <ConstructionIcon
            onClick={onCorrection}
            color="action"
            fontSize="medium"
            titleAccess="Faktury korygujące"
          />
        </span>
      </Tooltip>
    </div>
  );
};

export default InvoiceIcons;

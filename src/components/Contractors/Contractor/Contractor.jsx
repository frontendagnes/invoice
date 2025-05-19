import "./Contractor.css";
//mui
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
//components
import Tooltip from "../../Tooltip/Tooltip";

function Contractor({ item, onEdit, onDelete, onCancelEdit, isEdit }) {
  const handleEditClick = () => {
    onEdit(item);
  };

  const handleCancelEditClick = () => {
    onCancelEdit();
  };
  return (
    <li className="contractor">
      <div className="contractor__data">
        <span>
          <span className="contractor__name">Nazwa: </span>
          {item.data.contractor}
        </span>
        <span>
          <span className="contractor__name">NIP: </span>
          {item.data.nip}
        </span>
        <span>
          <span className="contractor__name">Ulica: </span>
          {item.data?.street}
        </span>
        <span>
          <span className="contractor__name">Kod pocztowy: </span>
          {item.data?.zipCode}
        </span>
        <span>
          <span className="contractor__name">Miejscowość: </span>
          {item.data?.town}
        </span>
      </div>
      <div className="contractor__actions">
        <Tooltip text={isEdit ? "Zakończ Edycję" : "Edytuj"}>
          {isEdit ? (
            <span onClick={handleCancelEditClick}>Zakończ edycję</span>
          ) : (
            <IconButton aria-label="edit" className="contractor__action">
              <EditIcon
                className="contractor__action--edit"
                onClick={handleEditClick}
              />
            </IconButton>
          )}
        </Tooltip>
        <Tooltip text="Usuń">
          <IconButton aria-label="delete" className="contractor__action">
            <DeleteForeverIcon
              className="contractor__action--delete"
              onClick={() => onDelete(item.id)}
            />
          </IconButton>
        </Tooltip>
      </div>
    </li>
  );
}

export default Contractor;

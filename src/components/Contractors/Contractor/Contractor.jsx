import { useEffect, useState, useRef } from "react";
import "./Contractor.css";
import { useClickOutside } from "../../../hooks/useClickOutside";
//mui
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
//components
import Tooltip from "../../Tooltip/Tooltip";
import EditContractor from "../EditContractor/EditContractor";

function Contractor({ item, onDelete }) {
  const { contractor, nip, street, zipCode, town } = item.data;
  const [isEdit, setIsEdit] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsEdit(false);
    }
  };
  useEffect(() => {
    if (!isEdit) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEdit]);

  const refButton = useRef(null);
  const refEdit = useRef(null);

  useClickOutside(refEdit, () => setIsEdit(false), [refButton]);

  const handleEditClick = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <li className="contractor">
      <div className="contractor__data">
        <span>
          <span className="contractor__name">Nazwa: </span>
          {contractor}
        </span>
        <span>
          <span className="contractor__name">NIP: </span>
          {nip}
        </span>
        <span>
          <span className="contractor__name">Ulica: </span>
          {street}
        </span>
        <span>
          <span className="contractor__name">Kod pocztowy: </span>
          {zipCode}
        </span>
        <span>
          <span className="contractor__name">Miejscowość: </span>
          {town}
        </span>
      </div>
      <div className="contractor__actions">
        <Tooltip text="Edytuj">
          <IconButton aria-label="edit" className="contractor__action">
            <EditIcon
              ref={refButton}
              className="contractor__action--edit"
              color="primary"
              onClick={handleEditClick}
            />
          </IconButton>
        </Tooltip>
        <Tooltip text="Usuń">
          <IconButton aria-label="delete" className="contractor__action">
            <RemoveCircleIcon
              className="contractor__action--delete"
              color="error"
              onClick={() => onDelete(item.id)}
            />
          </IconButton>
        </Tooltip>
      </div>
      <div
        ref={refEdit}
        className={`contractor__edit ${isEdit ? "expanded" : ""}`}
      >
        <EditContractor
          contractor={contractor}
          nip={nip}
          street={street}
          zipCode={zipCode}
          town={town}
          itemId={item.id}
          setIsEdit={setIsEdit}
          isEdit={isEdit}
        />
      </div>
    </li>
  );
}

export default Contractor;

import React, { useState } from "react";
import "./InvoicesItem.css";

//mui
import VisibilityIcon from "@mui/icons-material/Visibility";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditIcon from "@mui/icons-material/Edit";

//components
import DisplayingNumber from "../NumberComponents/DisplayingNumber/DisplayingNumber";
import AddNote from "../AddNote/AddNote";
import Tooltip from "../Tooltip/Tooltip";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
function InvoicesItem({
  name,
  number,
  index,
  date,
  openDetails,
  deleteItem,
  amount,
  noteCnt,
  optionalValue,
  nip,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="invoicesitem">
      {isModalOpen && (
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onClickYes={() => deleteItem(index)}
          onClickNo={() => setIsModalOpen(false)}
          item={name}
        />
      )}
      <div className="invoicesitem__wrapper">
        <div className="invoicesitem__content">
          <div className="invoicesitem__item">
            <span> Kontrahent:</span> <b>{name}</b>
          </div>

          <div className="invoicesitem__item">
            {nip ? (
              <>
                <span> NIP:</span> <b>{nip}</b>
              </>
            ) : (
              <span> BRAK NIp-u </span>
            )}
          </div>

          <div className="invoicesitem__number invoicesitem__item">
            <span> Numer Faktury: </span> <b>{number}</b>
          </div>
          <div className="invoicesitem__item">
            <span>Data wystawienie:</span> <b>{date}</b>
          </div>
          <div className="invoicesitem__item">
            <span>Wartość:</span>
            <DisplayingNumber
              value={amount}
              renderText={(value) => (
                <b>{Number.parseFloat(value || 0).toFixed(2)} zł</b>
              )}
            />
          </div>
        </div>
        <div className="invoicesitem__icons">
          <Tooltip text="Podgląd faktury">
            <VisibilityIcon
              onClick={() => openDetails(index)}
              color="success"
              fontSize="medium"
              titleAccess="Podgląd Faktury"
            />
          </Tooltip>
          <Tooltip text="Dodaj notatkę">
            <EditIcon
              onClick={() => setIsEdit(!isEdit)}
              color="primary"
              fontSize="medium"
              titleAccess="Edytuj notaktę"
            />
          </Tooltip>
          <Tooltip text="Usuń fakturę">
            <RemoveCircleIcon
              onClick={() => setIsModalOpen(true)}
              color="error"
              fontSize="medium"
              titleAccess="Usuń Fakturę"
            />
          </Tooltip>
        </div>
      </div>
      <div className="invoicesitem__note">{noteCnt}</div>
      {isEdit ? (
        <AddNote
          optionalValue={optionalValue}
          setIsEdit={setIsEdit}
          index={index}
        />
      ) : null}
    </div>
  );
}

export default InvoicesItem;

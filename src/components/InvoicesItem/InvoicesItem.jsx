import React, { useState } from "react";
import "./InvoicesItem.css";

//mui
import VisibilityIcon from "@mui/icons-material/Visibility";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditIcon from "@mui/icons-material/Edit";

//components
import DisplayingNumber from "../NumberComponents/DisplayingNumber/DisplayingNumber";
import AddNote from "../AddNote/AddNote";

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
}) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="invoicesitem">
      <div className="invoicesitem__wrapper">
        <div className="invoicesitem__content">
          <div className="invoicesitem__item">
            Kontrahent: <b>{name}</b>
          </div>

          <div className="invoicesitem__number invoicesitem__item">
            Numer Faktury: <b>{number}</b>
          </div>

          <div className="invoicesitem__item">
            Data wystawienie: <b>{date}</b>
          </div>
          <div className="invoicesitem__item">
            Wartość:{" "}
            <DisplayingNumber
              value={amount}
              renderText={(value) => (
                <b>{Number.parseFloat(value).toFixed(2)} zł</b>
              )}
            />
          </div>
        </div>
        <div className="invoicesitem__icons">
          <VisibilityIcon
            onClick={() => openDetails(index)}
            color="success"
            fontSize="medium"
            titleAccess="Podgląd Faktury"
          />
          <EditIcon
            onClick={() => setIsEdit(!isEdit)}
            color="primary"
            fontSize="medium"
            titleAccess="Edytuj notaktę"
          />
          <RemoveCircleIcon
            onClick={() => deleteItem(index)}
            color="error"
            fontSize="medium"
            titleAccess="Usuń Fakturę"
          />
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

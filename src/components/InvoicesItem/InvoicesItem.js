import React from "react";
import "./InvoicesItem.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

function InvoicesItem({
  name,
  number,
  index,
  date,
  openDetails,
  deleteItem,
  note,
  amount
}) {
  return (
    <div className="invoicesitem">
      <div className="invoicesitem__wrapper">
        <div className="invoicesitem__item">
          Kontrahent: <b>{name}</b>
        </div>

        <div className="invoicesitem__number invoicesitem__item">
          Numer Faktury: <b>{number}</b>
        </div>

        <div className="invoicesitem__item">
          Data wystawienie: <b>{date}</b>
        </div>
        {/* <div className="invoicesitem__item">
          Kwota Faktury: <b>{amount}</b>
        </div> */}
        <div className="invoicesitem__icons">
          <VisibilityIcon
            onClick={() => openDetails(index)}
            color="success"
            fontSize="medium"
            titleAccess="Podgląd Faktury"
          />
          <RemoveCircleIcon
            onClick={() => deleteItem(index)}
            color="error"
            fontSize="medium"
            titleAccess="Usuń Fakturę"
          />
        </div>
      </div>
      <div className="invoicesitem__note">{note}</div>
    </div>
  );
}

export default InvoicesItem;

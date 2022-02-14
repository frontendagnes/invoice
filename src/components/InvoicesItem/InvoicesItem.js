import React from "react";
import "./InvoicesItem.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

function InvoicesItem({ name, number, index, date, openDetails, deleteItem }) {
  return (
    <div className="invoicesitem">
      <div className="invoicesitem__item">
        Kontrahent: <b>{name}</b>
      </div>

      <div className="invoicesitem__number invoicesitem__item">
        Numer Faktury: <b>{number}</b>
      </div>

      <div className="invoicesitem__item">
        Data wystawienie: <b>{date}</b>
      </div>
      <div className="invoicesitem__icons">
        <VisibilityIcon
          onClick={() => openDetails(index)}
          color="success"
          fontSize="medium"
        />
        <RemoveCircleIcon
          onClick={() => deleteItem(index)}
          color="error"
          fontSize="medium"
        />
      </div>
    </div>
  );
}

export default InvoicesItem;

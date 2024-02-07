import React, { useState } from "react";
import "./InvoicesItem.css";
import { useStateValue } from "../../assets/utility/StateProvider";
import { doc, db, updateDoc } from "../../assets/utility/firebase";

import DisplayingNumber from "../NumberComponents/DisplayingNumber/DisplayingNumber";
//mui
import VisibilityIcon from "@mui/icons-material/Visibility";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditIcon from "@mui/icons-material/Edit";
import { Button, TextField } from "@mui/material";
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
  const [{ user }, dispatch] = useStateValue();
  const [isEdit, setIsEdit] = useState(false);
  const [note, setNote] = useState("");

  const saveNote = async () => {
    const saveRef = doc(db, `invoices/${user.uid}/invoice/${index}`);
    await updateDoc(saveRef, {
      note: note,
    })
      .then(() =>
        dispatch({
          type: "ALERT_SUCCESS",
          item: "Notatka została pomyślnie zapisana",
        })
      )
      .catch((error) => {
        console.log(error.message);
        dispatch({ type: "ALERT__ERROR", item: error.message });
      });
    setNote("");
    setIsEdit(false);
  };

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
        <div className="note">
          <div className="note__row">
            <TextField
              value={note || optionalValue}
              onChange={(e) => setNote(e.target.value)}
              id="outlined-basic"
              label="Edytuj Notatkę"
              placeholder="np. informacja o zwrocie, terminie płatności itp."
              variant="outlined"
              fullWidth
            />
          </div>
          <Button type="button" onClick={() => saveNote(index)}>
            Edytuj notaktę
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default InvoicesItem;

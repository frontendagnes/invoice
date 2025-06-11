import React, { useState } from "react";
import "./AddNote.css";

import useFirestore from "../../api/useFirestore/useFirestore";
import { useStateValue } from "../../assets/utility/StateProvider";
//mui
import { TextField } from "@mui/material";
//components
import FormButton from "../Form/FormButton/FormButton";
import ValidationError from "../ValidationError/ValidationError";

function AddNote({ optionalValue, setIsEdit, index }) {
  const [note, setNote] = useState("" || optionalValue);
  const [{ user }, dispatch] = useStateValue();
  const { updateDocument, loading, errorFirestore } = useFirestore("invoices");

  const  saveNote = async () => {
    if (!note || !note.trim()) {
      dispatch({
        type: "ALERT__ERROR",
        item: "Nie można zapisać pustej notatki",
      });
      return;
    }
    await updateDocument("invoice", index, { note: note });
    setNote("");
    setIsEdit(false);
  };

  return (
    <div className="note">
      {errorFirestore ? <ValidationError text={errorFirestore} /> : null}
      <div className="note__row">
        <TextField
          value={note}
          onChange={(e) => setNote(e.target.value)}
          id="outlined-basic"
          label={optionalValue ? "Edytuj notatkę" : "Dodaj notatkę"}
          placeholder="np. informacja o zwrocie, terminie płatności itp."
          variant="outlined"
          sx={{ backgroundColor: "#ffffff"}}
          fullWidth
        />
        <FormButton
          text={loading ? "Zapisuję..." : "Zapisz"}
          disabled={loading}
          onClick={saveNote}
          styles={{ textTransform: "none", marginLeft: "10px" }}
        />
      </div>
    </div>
  );
}

export default AddNote;

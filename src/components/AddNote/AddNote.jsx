import { useState, useCallback, useEffect } from "react";
import "./AddNote.css";
import { validate } from "./validate";

import useFirestore from "../../api/useFirestore/useFirestore";
//mui
import { TextField } from "@mui/material";
//components
import FormButton from "../Form/FormButton/FormButton";
import Tooltip from "../Tooltip/Tooltip";
import ValidationError from "../ValidationError/ValidationError";

const MAX_NOTE_LENGTH = 500;

function AddNote({ initialNote, onClose, invoiceId }) {
  const [note, setNote] = useState(initialNote || "");
  const [errors, setErrors] = useState({});
  const { updateDocument, loading, errorFirestore } = useFirestore("invoices");

  const saveNote = async () => {
    const validationError = validate(note);
    if (validationError) {
      setErrors(validationError);
      return;
    }

    await updateDocument("invoice", invoiceId, { note: note });
    setNotes({});
    onClose(false);
  };
  const handleNoteChange = useCallback((e) => {
    const { name, value } = e.target;
    setNote(value);
    // Na bieżąco usuwaj błędy danego pola
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, []);
  const isChanged = note.trim() !== initialNote.trim();
  return (
    <div className="note">
      {errorFirestore ? <ValidationError text={errorFirestore} /> : null}
      <div className="note__row">
        <TextField
          value={note}
          name="note"
          onChange={handleNoteChange}
          id="outlined-basic"
          label={initialNote ? "Edytuj notatkę" : "Dodaj notatkę"}
          placeholder="np. informacja o zwrocie, terminie płatności itp."
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#ffffff",
            },
            "& .MuiFormHelperText-root": {
              color: "#676767",
            },
          }}
          inputProps={{
            maxLength: MAX_NOTE_LENGTH,
          }}
          error={!!errors.note}
          helperText={errors.note || `${note.length}/${MAX_NOTE_LENGTH}`}
          fullWidth
        />
        <div className="note__actions">
          <Tooltip
            text={`${isChanged ? "Zapisz zmiany" : "Brak zmian do zapisania"}`}
          >
            <FormButton
              text={loading ? "Zapisuję..." : "Zapisz"}
              disabled={loading || !isChanged}
              onClick={saveNote}
              styles={{ textTransform: "none", marginLeft: "10px" }}
            />
          </Tooltip>
          <FormButton
            text="Anuluj"
            color="success"
            onClick={() => {
              onClose(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AddNote;

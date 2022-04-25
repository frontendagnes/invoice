import React from "react";
import "./Note.css";
import { TextField } from "@mui/material";
function Note({ note, setNote }) {
  return (
    <div className="note">
      <div className="note__row">
        <TextField
          value={note}
          onChange={(e) => setNote(e.target.value)}
          id="outlined-basic"
          label="Uwagi"
          placeholder="np. informacja o zwrocie, terminie płatności itp."
          variant="outlined"
          fullWidth
        />
      </div>
    </div>
  );
}

export default Note;

import React from "react";
import { TextField } from "@mui/material";

function DataPlace({ date, setDate, place, setPlace }) {
  return (
    <div className="formtop__input">
      <div>
        <TextField
          label="Data wystawienia faktury"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
        />
      </div>
      <div>
        <TextField
          label="Miejsce wystawienia"
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          title="Wprowadzona wartość zostanie zapamiętana na tym komputerze!"
          fullWidth
        />
      </div>
    </div>
  );
}

export default DataPlace;

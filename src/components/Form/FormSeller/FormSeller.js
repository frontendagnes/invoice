import React from "react";
import "./FormSeller.css";
import { TextField } from "@mui/material";

function FormSeller({ seller, setSeller }) {
  return (
    <div className="formseller">
      <div className="createinvoice__text">Sprzedawca:</div>
      <div className="formseller__input">
        <TextField
          value={seller}
          onChange={(e) => setSeller(e.target.value)}
          id="outlined-basic"
          label="Imię i nazwisko"
          variant="outlined"
          fullWidth
        />
      </div>
    </div>
  );
}

export default FormSeller;

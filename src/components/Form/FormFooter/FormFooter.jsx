import React from "react";
import "./FormFooter.css"
import { TextField } from "@mui/material";

export const FooterSummary = ({ getTotal, productsStorage }) => {
  return (
    <div className="footer__summary ">
      Razem: {parseFloat(getTotal(productsStorage)).toFixed(2)} zł
    </div>
  );
};

export const FooterNote = ({ note, dispatch }) => {
  const handleChange = (e) => {
    dispatch({ type: "SET_NOTE", note: e.target.value });
  };
  return (
    <div className="note__row">
      <TextField
        value={note}
        onChange={handleChange}
        id="outlined-basic"
        label="Uwagi (opcjonalne)"
        placeholder="np. informacja o zwrocie, terminie płatności itp."
        variant="outlined"
        fullWidth
      />
    </div>
  );
};

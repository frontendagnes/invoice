import React from "react";
import "./FormTop.css";
import { TextField } from "@mui/material";

function FormTop({ date, setDate, count, year, order, setOrder, number }) {
  return (
    <div className="formtop">
      <div className="formtop__input">
        <div className="formtop__wrapper">
          <div className="formtop__input_row">
            <TextField
              value={count}
              id="outlined-basic"
              label="Lp."
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="formtop__input_row">
            <TextField
              value={year}
              id="outlined-basic"
              label="Rok"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="formtop__input_row">
            <TextField
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              id="outlined-basic"
              label="Numer"
              variant="outlined"
              fullWidth
            />
          </div>
        </div>
        <div>
          <TextField
            value={number}
            id="outlined-basic"
            label="Numer Faktury"
            variant="outlined"
            fullWidth
          />
        </div>
      </div>
      <div className="formtop__input">
        <TextField
          label="Data wystawienia faktury"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
        />
      </div>
    </div>
  );
}

export default FormTop;

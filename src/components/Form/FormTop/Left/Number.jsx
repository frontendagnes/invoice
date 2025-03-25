import React from "react";
import { TextField } from "@mui/material";

function Number({ count, setCount, year, order, setOrder, number }) {
  return (
    <div className="formtop__input">
      <div className="formtop__wrapper">
        <div className="formtop__input_row">
          <TextField
            value={count}
            onChange={(e) => setCount(e.target.value)}
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
  );
}

export default Number;

import React from "react";
import { TextField } from "@mui/material";

function Number({ count, dispatch, year, order, number }) {
  return (
    <div className="formtop__input">
      <div className="formtop__wrapper">
        <div className="formtop__input_row">
          <TextField
            value={count}
            // onChange={(e) => setCount(e.target.value)}
            onChange={(e) =>
              dispatch({ type: "SET_COUNT", count: e.target.value })
            }
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
            // onChange={(e) => setOrder(e.target.value)}
            onChange={(e) =>
              dispatch({ type: "SET_ORDER", order: e.target.value })
            }
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

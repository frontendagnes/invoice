import React from "react";
import "./FormTop.css";
import { TextField, ToggleButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
function FormTop({
  date,
  setDate,
  count,
  year,
  order,
  setOrder,
  number,
  setCount,
  check,
  setCheck,
}) {
  return (
    <div className="formtop">
      <div className="formtop__input">
        <div className="formtop__toggleButton">
          <div className="formtop__info">
            Zaznacz jeżeli chcesz użyć innego niż standardowy numer faktury np. wprowadzasz zwrot,
            regularny numer nie ulegnie wtedy zmianie (domyślnie wyłączone).
          </div>
          <div className="formtop__icon">
          <ToggleButton
            value="check"
            selected={check}
            onChange={() => setCheck(!check)}
            fullWidth
          >
            <CheckIcon color={!check ? "error" : "success"} />
            {!check ? (
              <span style={{ color: "#ff0000" }}>OFF</span>
            ) : (
              <span style={{ color: "#008000" }}>ON</span>
            )}
          </ToggleButton>
          </div>
        </div>
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

import React from "react";
import "./FormPerson.css";
import NumberFormat from "react-number-format";
import { TextField } from "@mui/material";

function FormPerson({
  name,
  street,
  zipcode,
  town,
  nip,
  handleChange,
  title
}) {
  return (
    <div className="formperson">
      <div className="createinvoice__text">{title}:</div>
      <div className="formperson__input">
        <TextField
          value={name}
          name="name"
          onChange={handleChange}
          id="outlined-basic"
          label="Imię i nazwisko"
          variant="outlined"
          fullWidth
        />
      </div>
      <div className="formperson__input">
        <TextField
          value={street}
          name="street"
          onChange={handleChange}
          id="outlined-basic"
          label="Ulica i numer domu"
          variant="outlined"
          fullWidth
        />
      </div>
      <div className="formperson__wrapper">
        <div className="formperson__input formperson__zipcode">
          <NumberFormat
            customInput={TextField}
            format="##-###"
            mask="_"
            placeholder="__-___"
            label="Kod pocztowy"
            name="ziopcode"
            value={zipcode}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <div className="formperson__input formperson__town">
          <TextField
            value={town}
            name={town}
            onChange={handleChange}
            id="outlined-basic"
            label="Miejscowość"
            variant="outlined"
            fullWidth
          />
        </div>
      </div>
      <div className="formperson__input">
        <NumberFormat
          className="formperson__nip"
          customInput={TextField}
          format="###-###-##-##"
          mask="_"
          placeholder="___-___-__-__"
          label="NIP"
          name="npi"
          value={nip}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default FormPerson;

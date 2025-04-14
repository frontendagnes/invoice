import React from "react";
import "./FormPerson.css";

import { TextField } from "@mui/material";
import NumericField from "../../NumberComponents/NumericField/NumericField.jsx";

function FormPerson({ data, title, dispatch, type }) {
  const { name, street, zipcode, town, nip } = data;

  const handleChange = (type) => (e) => {
    dispatch({
      type: type,
      payload: { [e.target.name]: e.target.value },
    });
  };

  return (
    <div className="formperson">
      <div className="createinvoice__text">{title}:</div>
      <div className="formperson__input">
        <TextField
          value={name}
          name="name"
          onChange={handleChange(type)}
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
          onChange={handleChange(type)}
          id="outlined-basic"
          label="Ulica i numer domu"
          variant="outlined"
          fullWidth
        />
      </div>
      <div className="formperson__wrapper">
        <div className="formperson__input formperson__zipcode">
          <NumericField
            format="##-###"
            mask="_"
            value={zipcode}
            onChange={handleChange(type)}
            placeholder="__-___"
            label="Kod pocztowy"
            name="zipcode"
          />
        </div>
        <div className="formperson__input formperson__town">
          <TextField
            value={town}
            name="town"
            onChange={handleChange(type)}
            id="outlined-basic"
            label="Miejscowość"
            variant="outlined"
            fullWidth
          />
        </div>
      </div>
      <div className="formperson__input">
        <NumericField
          className="formperson__nip"
          customInput={TextField}
          format="###-###-##-##"
          mask="_"
          placeholder="___-___-__-__"
          label="NIP"
          name="nip"
          value={nip}
          onChange={handleChange(type)}
        />
      </div>
    </div>
  );
}

export default FormPerson;

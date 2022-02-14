import React from "react";
import "./FormBuyer.css";
import NumberFormat from "react-number-format";
import { TextField } from "@mui/material";

function FormBuyer({
  nameBuyer,
  setNameBuyer,
  streetBuyer,
  setStreetBuyer,
  zipcodeBuyer,
  setZipcodeBuyer,
  townBuyer,
  setTownBuyer,
  nip,
  setNip,
}) {
  return (
    <div className="formbuyer">
      <div className="createinvoice__text">Nabywca:</div>
      <div className="formbuyer__input">
        <TextField
          value={nameBuyer}
          onChange={(e) => setNameBuyer(e.target.value)}
          id="outlined-basic"
          label="Imię i nazwisko"
          variant="outlined"
          fullWidth
        />
      </div>
      <div className="formbuyer__input">
        <TextField
          value={streetBuyer}
          onChange={(e) => setStreetBuyer(e.target.value)}
          id="outlined-basic"
          label="Ulica i numer domu"
          variant="outlined"
          fullWidth
        />
      </div>
      <div className="formbuyer__wrapper">
        <div className="formbuyer__input formbuyer__zipcode">
          <NumberFormat
            customInput={TextField}
            format="##-###"
            mask="_"
            placeholder="__-___"
            label="Kod pocztowy"
            value={zipcodeBuyer}
            onChange={(e) => setZipcodeBuyer(e.target.value)}
            fullWidth
          />
        </div>
        <div className="formbuyer__input formbuyer__town">
          <TextField
            value={townBuyer}
            onChange={(e) => setTownBuyer(e.target.value)}
            id="outlined-basic"
            label="Miejscowość"
            variant="outlined"
            fullWidth
          />
        </div>
      </div>
      <div className="formbuyer__input">
        <NumberFormat
          className="formbuyer__nip"
          customInput={TextField}
          format="###-###-##-##"
          mask="_"
          placeholder="___-___-__-__"
          label="NIP"
          value={nip}
          onChange={(e) => setNip(e.target.value)}
        />
      </div>
    </div>
  );
}

export default FormBuyer;

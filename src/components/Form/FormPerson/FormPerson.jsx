import "./FormPerson.css";

import { TextField } from "@mui/material";
import NumericField from "../../NumberComponents/NumericField/NumericField.jsx";

function FormPerson({ data, title, dispatch, type, errors }) {
  const { name, street, zipcode, town, nip } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: type,
      payload: { [name]: value },
    });
  };

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
          helperText={errors.name}
          error={!!errors.name}
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
          helperText={errors.street}
          error={!!errors.street}
          fullWidth
        />
      </div>
      <div className="formperson__wrapper">
        <div className="formperson__input formperson__zipcode">
          <NumericField
            format="##-###"
            mask="_"
            value={zipcode}
            onChange={handleChange}
            placeholder="__-___"
            label="Kod pocztowy"
            name="zipcode"
            helperText={errors.zipcode}
            error={!!errors.zipcode}
          />
        </div>
        <div className="formperson__input formperson__town">
          <TextField
            value={town}
            name="town"
            onChange={handleChange}
            id="outlined-basic"
            label="Miejscowość"
            variant="outlined"
            helperText={errors.town}
            error={!!errors.town}
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
          onChange={handleChange}
          helperText={errors.nip}
          error={!!errors.nip}
        />
      </div>
    </div>
  );
}

export default FormPerson;

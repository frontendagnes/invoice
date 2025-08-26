import { useState } from "react";
import "./AddContractor.css";

//mui
import { TextField } from "@mui/material";
//components
import FormButton from "../../Form/FormButton/FormButton";
import Form from "../../Form/Form";
import AntySpam from "../../AntySpam/AntySpam";
import NumericField from "../../NumberComponents/NumericField/NumericField";

function AddContractor({
  state,
  setState,
  onContractorSubmit,
  test,
  setTest,
  errors,
  setErrors,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Na bieżąco usuwaj błędy danego pola umieścić w onChange
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <Form className="addContractor" onSubmit={onContractorSubmit}>
      <h2 className="addContractor__title">Dodaj kontrahenta</h2>
      <div className="addContractor__inputsWrapper">
        <div className="addContractor__section">
          <div className="addContractor__input">
            <TextField
              name="contractor"
              value={state.contractor}
              onChange={handleChange}
              id="contractor"
              label="Nazwa kontrachenta"
              variant="outlined"
              helperText={errors.contractor || "Podaj nazwę kontrachenta"}
              error={!!errors.contractor}
              fullWidth
            />
          </div>
          <div className="addContractor__input--numeric">
            <NumericField
              name="nip"
              format="###-###-##-##"
              mask="_"
              placeholder="___-___-__-__"
              label="NIP"
              value={state.nip}
              onChange={handleChange}
              helperText={errors.nip || "Podaj numer NIP"}
              error={!!errors.nip}
            />
          </div>
        </div>
        <div className="addContractor__section">
          <div className="addContractor__input">
            <TextField
              name="street"
              value={state.street}
              onChange={handleChange}
              id="street"
              label="Nazwa Ulicy"
              variant="outlined"
              helperText="Podaj nazwę kulicy"
              fullWidth
            />
          </div>
          <div className="addContractor__input">
            <NumericField
              name="zipCode"
              format="##-###"
              mask="_"
              placeholder="__-___"
              label="Kod pocztowy"
              value={state.zipCode}
              onChange={handleChange}
              helperText="Kod pocztowy"
            />
            <TextField
              name="town"
              value={state.town}
              onChange={handleChange}
              id="town"
              label="Nazwa miejscowości"
              variant="outlined"
              helperText="Podaj nazwę miejscowości"
              fullWidth
            />
          </div>
        </div>
        <AntySpam test={test} setTest={setTest} />
      </div>
      <FormButton
        text="Dodaj"
        type="submit"
        className="addContractorButton"
        styles={{
          width: "60%",
          textTransform: "none",
          fontSize: "1.2rem",
          letterSpacing: "2px",
        }}
      />
    </Form>
  );
}

export default AddContractor;

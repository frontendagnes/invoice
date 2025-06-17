import { useState } from "react";
import useFirestore from "../../../api/useFirestore/useFirestore.jsx";
import { useStateValue } from "../../../utility/StateProvider.jsx";
import "./EditCost.css";
import { validate } from "./validate.js";
//mui
import { TextField } from "@mui/material";
//componets
import AntySpam from "../../AntySpam/AntySpam.jsx";
import Form from "../../Form/Form.jsx";
import FormButton from "../../Form/FormButton/FormButton.jsx";
import NumericField from "../../NumberComponents/NumericField/NumericField.jsx";
import Tooltip from "../../Tooltip/Tooltip.jsx";
import ValidationError from "../../ValidationError/ValidationError.jsx";

function EditCost({
  number,
  contractor,
  date,
  amount,
  nip,
  itemId,
  setIsEditing,
}) {
  const { loading, errorFirestore, setDocument } = useFirestore("invoices");
  const [{ user }, dispatch] = useStateValue();

  const [form, setForm] = useState({
    number: number || "",
    contractor: contractor || "",
    date: date || "",
    amount: amount || "",
    nip: nip || "",
  });

  const isChanged =
    form.number !== number ||
    form.contractor !== contractor ||
    form.date !== date ||
    form.amount !== amount ||
    form.nip !== nip;

  const [test, setTest] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // Na bieżąco usuwaj błędy danego pola
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form, test);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    await setDocument("costs", itemId, form);
    dispatch({
      type: "ALERT_SUCCESS",
      item: "Koszt został zaktualizowany pomyśłnie!",
    });
    setIsEditing(false);
  };

  return (
    <Form className="editCost" onSubmit={handleSubmit}>
      {errorFirestore && <ValidationError text={errorFirestore} />}
      {errors.test && <ValidationError text={errors.test} />}

      <div className="editCost__items">
        <div className="editCost__item">
          <TextField
            label="Popraw numer faktury"
            name="number"
            value={form.number}
            onChange={handleChange}
            fullWidth
            helperText={errors.number}
            error={!!errors.number}
          />
        </div>

        <div className="editCost__item">
          <TextField
            label="Popraw nazwę kontrahenta"
            name="contractor"
            value={form.contractor}
            onChange={handleChange}
            fullWidth
            helperText={errors.contractor}
            error={!!errors.contractor}
          />
        </div>

        <div className="editCost__item">
          <NumericField
            label="Popraw NIP"
            name="nip"
            value={form.nip}
            onChange={handleChange}
            format="###-###-##-##"
            mask="_"
            placeholder="___-___-__-__"
            helperText={errors.nip}
            error={!!errors.nip}
          />
        </div>

        <div className="editCost__item">
          <TextField
            label="Zmień datę faktury"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            fullWidth
            helperText={errors.date}
            error={!!errors.date}
            InputLabelProps={{ shrink: true }}
          />
        </div>

        <div className="editCost__item">
          <NumericField
            label="Popraw kwotę brutto"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            numeric
            helperText={errors.amount}
            error={!!errors.amount}
          />
        </div>
      </div>
      <Tooltip text={!isChanged ? "Brak zmian do zapisania" : ""}>
        <div className="editCost__actions">
          <FormButton
            text={loading ? "Aktualizuje..." : "Aktualizuj Koszt"}
            disabled={loading || !isChanged}
            styles={{ width: "100%" }}
            type="submit"
            className="editCost__button"
          />
        </div>
      </Tooltip>
      <AntySpam test={test} setTest={setTest} />
    </Form>
  );
}

export default EditCost;

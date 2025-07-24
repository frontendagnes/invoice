import { useState } from "react";
import "./EditContractor.css";
import useFirestore from "../../../api/useFirestore/useFirestore.jsx";
import { useStateValue } from "../../../state/StateProvider.jsx";

import { validate } from "../validate.js";
//comonents
import Form from "../../Form/Form";
import FormButton from "../../Form/FormButton/FormButton";
import Tooltip from "../../Tooltip/Tooltip";
import ValidationError from "../../ValidationError/ValidationError";
import AntySpam from "../../AntySpam/AntySpam.jsx";
import ContractorFields from "./ContractorFields.jsx";

function EditContractor({
  contractor,
  nip,
  street,
  zipCode,
  town,
  itemId,
  setIsEdit,
}) {
  const [test, setTest] = useState("");
  const [errors, setErrors] = useState({});
  const { updateDocument, loading, errorFirestore } = useFirestore("invoices");
  const [, dispatch] = useStateValue();

  const [form, setForm] = useState({
    contractor: contractor || "",
    nip: nip || "",
    street: street || "",
    zipCode: zipCode || "",
    town: town || "",
  });

  const isChanged =
    form.contractor.trim() !== (contractor || "").trim() ||
    form.nip.trim() !== (nip || "").trim() ||
    form.street.trim() !== (street || "").trim() ||
    form.zipCode.trim() !== (zipCode || "").trim() ||
    form.town.trim() !== (town || "").trim();

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
    await updateDocument("contractors", itemId, form);
    dispatch({
      type: "ALERT_SUCCESS",
      item: "Aktualizacja przebiegła pomyślnie!",
    });
    setIsEdit(false);
  };

  const buttonText = loading
    ? "Aktualizowanie..."
    : !isChanged
    ? "Brak zmian do zapisania"
    : "Zapisz zmiany";

  if (!contractor) return null;
  return (
    <Form className="editContractor" onSubmit={handleSubmit}>
      {errorFirestore && <ValidationError text={errorFirestore} />}
      {errors.test && <ValidationError text={errors.test} />}
      <div className="editContractor__inputs">
        <ContractorFields
          form={form}
          errors={errors}
          handleChange={handleChange}
        />
      </div>
      <Tooltip
        text={!isChanged ? "Brak zmian do zapisania" : ""}
        containerDisplay="flex"
        containerWidth="100%"
      >
        <div className="editContractor__actions">
          <FormButton
            text={buttonText}
            disabled={!isChanged || loading}
            type="submit"
            styles={{ width: "100%" }}
            className="editContractor__button"
          />
        </div>
      </Tooltip>
      <AntySpam test={test} setTest={setTest} />
    </Form>
  );
}

export default EditContractor;

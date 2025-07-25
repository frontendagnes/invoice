import { useState } from "react";
import "./EditProducts.css";
import { validate } from "../validate";
import useFirestore from "../../../api/useFirestore/useFirestore";
import { useStateValue } from "../../../state/StateProvider";
//mui
import { TextField } from "@mui/material";
//components
import Form from "../../Form/Form";
import FormButton from "../../Form/FormButton/FormButton";
import AntySpam from "../../AntySpam/AntySpam";
import Tooltip from "../../Tooltip/Tooltip";
import ValidationError from "../../ValidationError/ValidationError";

function EditProducts({
  name,
  price,
  description,
  quantity,
  productId,
  setIsEdit,
}) {
  const { loading, errorFirestore, updateDocument } = useFirestore("invoices");
  const [, dispatch] = useStateValue();

  const [errors, setErrors] = useState({});
  const [test, setTest] = useState("");
  const [form, setForm] = useState({
    name: name || "",
    price: price || 0,
    description: description || "",
    quantity: quantity || 1,
  });
  const isChanged =
    form.name.trim() !== (name || "").trim() ||
    form.price !== (price || "") ||
    form.description.trim() !== (description || "").trim() ||
    form.quantity !== (quantity || "");

  const handleChange = (e) => {
    const { name, value } = e.target;

    const isNumericField = name === "price" || name === "quantity";
    const parsedValue = isNumericField ? Number(value) : value;

    setForm((prev) => ({ ...prev, [name]: parsedValue }));

    // Na bieżąco usuwaj błędy danego pola
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorField = validate(form, test);
    if (errorField) {
      setErrors(errorField);
      return;
    }
    await updateDocument("products", productId, form);
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

  return (
    <Form className="editProducts" onSubmit={handleSubmit}>
      <div className="editProducts__error">
        {errorFirestore && <ValidationError text={errorFirestore} />}
      </div>
      <div className="editProducts__inputs">
        <div className="editProducts__inputs--row">
          <TextField
            name="name"
            label="Popraw nazwę produktu"
            value={form.name}
            onChange={handleChange}
            fullWidth
            helperText={errors.name ? errors.name : " "}
            error={!!errors.name}
          />
        </div>
        <div className="editProducts__inputs--row">
          <TextField
            name="price"
            label="Popraw cenę produktu"
            value={form.price}
            onChange={handleChange}
            fullWidth
            helperText={errors.price ? errors.price : " "}
            error={!!errors.price}
          />
        </div>
        <div className="editProducts__inputs--row">
          <TextField
            name="quantity"
            label="Popraw ilość produktu"
            value={form.quantity}
            onChange={handleChange}
            fullWidth
            helperText={errors.quantity ? errors.quantity : " "}
            error={!!errors.quantity}
          />
        </div>
        <div className="editProducts__inputs--row">
          <TextField
            name="description"
            label="Popraw opis"
            value={form.description}
            onChange={handleChange}
            fullWidth
            helperText={errors.description ? errors.description : " "}
            error={!!errors.description}
          />
        </div>
      </div>
      <Tooltip
        text={!isChanged && "Brak zmian do zapisu"}
        containerDisplay="block"
        containerWidth="100%"
      >
        <div className="editProducts__actions">
          <FormButton
            text={buttonText}
            type="submit"
            styles={{ width: "70%" }}
            disabled={!isChanged || loading}
          />
        </div>
      </Tooltip>
      <AntySpam test={test} setTest={setTest} />
    </Form>
  );
}

export default EditProducts;

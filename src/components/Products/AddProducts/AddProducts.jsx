import { useState } from "react";
import "./AddProducts.css";
import useFirestore from "../../../api/useFirestore/useFirestore";
import { useStateValue } from "../../../state/StateProvider";
import { validate } from "../validate";
//components
import Form from "../../Form/Form";
import FormButton from "../../Form/FormButton/FormButton";
import ProductFields from "./ProductFields";
import ValidationError from "../../ValidationError/ValidationError";
import AntySpam from "../../AntySpam/AntySpam";

const initialFormState = { name: "", price: "", quantity: 1, description: "" };

function AddProducts() {
  const { loading, errorFirestore, addDocument } = useFirestore("invoices");
  const [, dispatch] = useStateValue();
  const [test, setTest] = useState("");
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState(initialFormState);

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
    await addDocument({ ...form, createdAt: new Date() }, "products");
    dispatch({
      type: "ALERT_SUCCESS",
      item: "Produkt dodano pomyślnie!",
    });

    setForm(initialFormState);
  };
  return (
    <Form className="addProducts" onSubmit={handleSubmit}>
      <h2 className="addProducts__title">Dodaj produkt</h2>
      {errorFirestore && <ValidationError text={errorFirestore} />}
      <div className="addProducts__inputs">
        <ProductFields
          form={form}
          handleChange={handleChange}
          errors={errors}
        />
      </div>
      <div className="addProducts__actions">
        <FormButton
          text={loading ? "Dodaje..." : "Dodaj produkt"}
          type="submit"
          disabled={loading}
        />
      </div>
      <AntySpam test={test} setTest={setTest} />
    </Form>
  );
}

export default AddProducts;

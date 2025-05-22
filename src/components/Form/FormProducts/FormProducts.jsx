import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./FormProducts.css";
import { validate } from "./validate.jsx";

//mui
import { TextField } from "@mui/material";
//components
import NumericField from "../../NumberComponents/NumericField/NumericField.jsx";
import ValidationError from "../../ValidationError/ValidationError";
import FormButton from "../FormButton/FormButton.jsx";

function FormProducts({
  title,
  quantity,
  price,
  productsStorage,
  setProductsStorage,
  dispatch,
}) {
  const [error, setError] = useState("");

  const worth = useMemo(() => quantity * price, [quantity, price]);

  const addProduct = () => {
    const msg = validate(title, quantity, price);
    if (msg) {
      setError(msg);
      return;
    }
    const objStorage = {
      id: uuidv4(),
      title: title,
      quantity: quantity,
      price: price,
      worth: worth,
      vat: 0,
    };
    setProductsStorage([...productsStorage, objStorage]);
    dispatch({ type: "SET_TITLE", title: "" });
    dispatch({ type: "SET_QUANTITY", quantity: 1 });
    dispatch({ type: "SET_PRICE", price: 0 });
    setError("");
  };
  const handleTitleChange = (e) => {
    dispatch({ type: "SET_TITLE", title: e.target.value });
    setError("");
  };

  const handleQuantityChange = (e) => {
    const parsedQuantity = parseFloat(e.target.value || 0);
    dispatch({ type: "SET_QUANTITY", quantity: parsedQuantity });
    setError("");
  };
  const handlePriceChange = (e) => {
    dispatch({ type: "SET_PRICE", price: e.target.value });
    setError("");
  };
  return (
    <div className="formproducts">
      <div className="createinvoice__text">Dodaj Produkty:</div>
      {error ? <ValidationError text={error} /> : null}
      <div className="formproducts__wrapper">
        <div className="formproducts__input">
          <TextField
            value={title}
            onChange={handleTitleChange}
            id="outlined-basic"
            label="Nazwa produktu"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="formproducts__input">
          <TextField
            min="1"
            max="999"
            value={quantity}
            type="number"
            onChange={handleQuantityChange}
            id="outlined-basic"
            label="Ilość"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="formproducts__input">
          <NumericField
            value={price}
            onChange={handlePriceChange}
            label="Cena jedn."
            numeric
          />
        </div>
        <div className="formproducts__button">
          <FormButton text="Dodaj produkt" onClick={addProduct} />
        </div>
      </div>
    </div>
  );
}

export default FormProducts;

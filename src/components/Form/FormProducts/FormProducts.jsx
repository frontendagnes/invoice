import React, { useState } from "react";
import "./FormProducts.css";

//mui
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
//components
import ValidationError from "../../ValidationError/ValidationError";
import NumericField from "../../NumberComponents/NumericField/NumericField.jsx";
import FormButton from "../FormButton/FormButton.jsx";
import { Add } from "@mui/icons-material";
const validate = (title, quantity, price) => {
  if (!title) {
    return "Wpisz nazwę produktu";
  }
  if (!quantity) {
    return "Podaj ilość produktów";
  } else if (quantity < 1) {
    return "Ilość musi być większa od 0";
  }
  if (!price) {
    return "Podaj cenę jednostkową";
  }
  return null;
};

function FormProducts({
  title,
  setTitle,
  quantity,
  price,
  setPrice,
  setQuantity,
  productsStorage,
  setProductsStorage,
}) {
  const [error, setError] = useState("");
  const endValue = () => {
    return quantity * price;
  };

  const addProduct = () => {
    const msg = validate(title, quantity, price);
    if (msg) {
      setError(msg);
      return;
    }
    const objStorage = {
      title: title,
      quantity: quantity,
      price: price,
      worth: endValue(),
      vat: 0,
    };
    setProductsStorage([...productsStorage, objStorage]);
    setTitle("");
    setQuantity(1);
    setPrice(0);
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
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setQuantity(e.target.value)}
            id="outlined-basic"
            label="Ilość"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="formproducts__input">
          <NumericField
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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

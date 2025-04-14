import React, { useState } from "react";
import "./FormProducts.css";
import { v4 as uuidv4 } from "uuid";
//mui
import { TextField } from "@mui/material";
//components
import ValidationError from "../../ValidationError/ValidationError";
import NumericField from "../../NumberComponents/NumericField/NumericField.jsx";
import FormButton from "../FormButton/FormButton.jsx";

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
  if (price < 0){
    return "Cena nie może być ujemna"
  }
  return null;
};

function FormProducts({
  title,
  quantity,
  price,
  productsStorage,
  setProductsStorage,
  dispatch,
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
      id: uuidv4(),
      title: title,
      quantity: quantity,
      price: price,
      worth: endValue(),
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
  };

  const handleQuantityChange = (e) => {
    dispatch({ type: "SET_QUANTITY", quantity: e.target.value });
  };

  const handlePriceChange = (e) => {
    dispatch({ type: "SET_PRICE", price: e.target.value });
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

import React, { useState, useEffect } from "react";
import "./CreateInvoice.css";

import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

import db from "../../assets/utility/firebase";
import { today } from "../../assets/functions";
import NumberFormat from "react-number-format";
import { TextField } from "@mui/material";
import NativeSelect from "@mui/material/NativeSelect";
import { useStateValue } from "../../assets/utility/StateProvider";

function CreateInvoice() {
  const [number, setNumber] = useState("01/2022/42563");
  const [sequence, setSequence] = useState(1);
  const [date, setDate] = useState(today());
  const [nameBuyer, setNameBuyer] = useState("");
  const [streetBuyer, setStreetBuyer] = useState("");
  const [zipcodeBuyer, setZipcodeBuyer] = useState("");
  const [townBuyer, setTownBuyer] = useState("");
  const [seller, setSeller] = useState("Małgorzata Kamińska");
  const [selected, setSelected] = useState("przelew");
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  //ilość
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  //wartość
  const [worth, setWorth] = useState(0);

  const [{ user }] = useStateValue();
  const history = useNavigate();

  const index = () => {
    return `Invoice-${nanoid(10)}`;
  };

  const endValue = () => {
    return quantity * price;
  };
  const numberSequence = () => {
    setSequence((num) => num + 1);
  };
  const addProduct = () => {
    numberSequence();
    setProducts([
      ...products,
      {
        lp: sequence,
        title: title,
        quantity: quantity,
        price: price,
        worth: endValue(),
        vat: 0,
      },
    ]);
    setTitle("");
    setQuantity(0);
    setPrice(0);
    setWorth(0);
  };
  const addInvoice = (e) => {
    e.preventDefault();
    db.collection("invoices")
      .doc(user?.uid)
      .collection("invoice")
      .doc(index())
      .set({
        date: date,
        number: number,
        payment: selected,
        buyer: {
          name: nameBuyer,
          street: streetBuyer,
          zipcode: zipcodeBuyer,
          town: townBuyer,
        },
        seller: seller,
        products: products,
      })

      history("./invoices")
  };

  const numberInput = (e) => {
    setQuantity(e.target.value);
  };
  return (
    <div className="createinvoice">
      <h2>Wprowadzanie danych</h2>
      <form>
        <div className="createinvoice__header">
          <div className="createinvoice__input">
            <TextField
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              id="outlined-basic"
              label="Numer Faktury"
              variant="outlined"
            />
          </div>
          <div className="createinvoice__date">
            <div className="createinvoice__input">
              <h5>Data Faktury</h5>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="createinvoice__wrapper">
          <div className="createinvoice__buyer">
            <h5>Nabywca:</h5>
            <div className="createinvoice__input">
              <TextField
                value={nameBuyer}
                onChange={(e) => setNameBuyer(e.target.value)}
                id="outlined-basic"
                label="Imię i nazwisko"
                variant="outlined"
              />
            </div>
            <div className="createinvoice__input">
              <TextField
                value={streetBuyer}
                onChange={(e) => setStreetBuyer(e.target.value)}
                id="outlined-basic"
                label="Ulica i numer domu"
                variant="outlined"
              />
            </div>
            <div className="createinvoice__input">
              <NumberFormat
                customInput={TextField}
                format="##-###"
                mask="_"
                placeholder="__-___"
                label="Kod pocztowy"
                className="createinvoice__zipcode"
                value={zipcodeBuyer}
                onChange={(e) => setZipcodeBuyer(e.target.value)}
              />
            </div>
            <div className="createinvoice__input">
              <TextField
                value={townBuyer}
                onChange={(e) => setTownBuyer(e.target.value)}
                id="outlined-basic"
                label="Miejscowość"
                variant="outlined"
              />
            </div>
          </div>
          <div className="createinvoice__input">
            <h5>Sprzedawca:</h5>
            <TextField
              value={seller}
              onChange={(e) => setSeller(e.target.value)}
              id="outlined-basic"
              label="Sprzedawca"
              variant="outlined"
            />
          </div>
        </div>
        <div>
          <p>Forma płatności:</p>
          <NativeSelect
            name="method-shipping"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            fullWidth
          >
            <option value="przelew">przelew</option>
            <option value="pobranie">pobranie</option>
          </NativeSelect>
        </div>
        <div>
          <p>Product</p>
          <div>
            <div className="createinvoice__input">
              <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="outlined-basic"
                label="Nazwa produktu"
                variant="outlined"
              />
            </div>
            <div className="createinvoice__input">
              <TextField
                min="1"
                max="999"
                value={quantity}
                type="number"
                onChange={numberInput}
                id="outlined-basic"
                label="Ilość"
                variant="outlined"
              />
            </div>
            <div className="createinvoice__input">
              <TextField
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                id="outlined-basic"
                label="Cena jedn. netto"
                variant="outlined"
              />
            </div>
            <button type="button" onClick={addProduct}>
              Dodaj produkt
            </button>
          </div>
          <div className="createinvoice__products">
            {products.map((item, index) => (
              <div key={index}>
                <p>Lp. {item.lp}</p>
                <p>Nazwa towaru: {item.title}</p>
                <p>Ilość: {item.quantity}</p>
                <p>Cene jedn. netto: {item.price}</p>
                <p>Wartość: {item.worth}</p>
                <p>Vat: {item.vat}</p>
              </div>
            ))}
          </div>
        </div>
        <button type="button" onClick={addInvoice}>
          Dodaj fakturę
        </button>
      </form>
    </div>
  );
}

export default CreateInvoice;

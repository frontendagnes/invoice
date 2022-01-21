import { TextField } from "@mui/material";

import moment from "moment";
import NumberFormat from "react-number-format";
import React, { useState, useEffect } from "react";
import "./CreateInvoice.css";

const today = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  const currentDay = () => {
    if (day < 10) {
      return `0${day}`;
    } else return day;
  };
  const currentMonth = () => {
    if (month < 10) {
      return `0${month}`;
    } else return month;
  };

  let fulldate = `${year}-${currentMonth()}-${currentDay()}`;
  return fulldate;
};

function CreateInvoice() {
  const [number, setNumber] = useState("01/2022/42563");
  const [sequence, setSequence] = useState(1);
  const [date, setDate] = useState(today());
  const [buyer, setBuyer] = useState([]);
  const [nameBuyer, setNameBuyer] = useState("");
  const [streetBuyer, setStreetBuyer] = useState("");
  const [zipcodeBuyer, setZipcodeBuyer] = useState("");
  const [townBuyer, setTownBuyer] = useState("");
  const [seller, setSeller] = useState("Małgorzata Kamińska");
  const [selected, setSelected] = useState("Przelew");
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  //ilość
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  //wartość
  const [worth, setWorth] = useState(0);
  const [inWords, setInWords] = useState("");
  // useEffect(() => {
  //   console.log(selected);
  // }, [selected]);
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
        inWords: inWords,
      },
    ]);
    setTitle("");
    setQuantity(0);
    setPrice(0);
    setWorth(0);
  };
  const addBuyer = () => {
    setBuyer([
      ...buyer,
      {
        name: nameBuyer,
        street: streetBuyer,
        zipcode: zipcodeBuyer,
        town: townBuyer,
      },
    ]);
    setNameBuyer("");
    setStreetBuyer("");
    setZipcodeBuyer("");
    setTownBuyer("");
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
            <div>
              <h5>Data zakońćzenia dostawy lub wykonania usługi</h5>
              {date}
            </div>
          </div>
        </div>
        <div className="createinvoice__buyerwrapper">
          <h5>Nabywca</h5>
          <div className="createinvoice__buyer">
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
              {/* <h5>Kod pocztowy</h5> */}
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
            <button type="button" onClick={addBuyer}>
              Dodaj Nabywce
            </button>
          </div>
          <div className="createinvoice__viewBuyer">
            {buyer.map((item, index) => (
              <div key={index}>
                <p>{item.name}</p>
                <p>{item.street}</p>
                <p>
                  {item.zipcode} {item.town}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>{seller}</div>
        <div>
          <p>Forma płatności:</p>
          <select
            name="method-shipping"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="przelew">Przelew</option>
            <option value="pobranie">Pobranie</option>
          </select>
        </div>
        <div>
          <p>Product</p>
          <div>
            <div>
              <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="outlined-basic"
                label="Nazwa produktu"
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                value={quantity}
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                id="outlined-basic"
                label="Ilość"
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                id="outlined-basic"
                label="Cena jedn. netto"
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                type="text"
                value={inWords}
                onChange={(e) => setInWords(e.target.value)}
                id="outlined-basic"
                label="Wartość słowanie"
                variant="outlined"
              ></TextField>
            </div>
            <button type="button" onClick={addProduct}>
              Dodaj produkt
            </button>
          </div>
          <div>
            {products.map((item, index) => (
              <div key={index}>
                <p>Lp. {item.lp}</p>
                <p>Nazwa towaru: {item.title}</p>
                <p>Ilość: {item.quantity}</p>
                <p>Cene jedn. netto: {item.price}</p>
                <p>Wartość: {item.worth}</p>
                <p>Vat: {item.vat}</p>
                <p>Razem: {item.worth}</p>
                <p>Słownie: {item.inWords}</p>
                <p>Zapłacono: {item.worth}</p>
                <p>Pozostało do zapłaty: 0</p>
              </div>
            ))}
          </div>
        </div>
        <div></div>
      </form>
    </div>
  );
}

export default CreateInvoice;

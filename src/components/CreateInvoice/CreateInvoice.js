import React, { useState, useEffect } from "react";
import "./CreateInvoice.css";
import Form from "../Form/Form";
import FormTop from "../Form/FormTop/FormTop";
import FormBuyer from "../Form/FormBuyer/FormBuyer";
import FormSeller from "../Form/FormSeller/FormSeller";
import FormPayment from "../Form/FormPaymnet/FormPayment";
import FormProducts from "../Form/FormProducts/FormProducts";
import ViewProducts from "../Form/ViewProducts.js/ViewProducts";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { today } from "../../assets/functions";
import db from "../../assets/utility/firebase";
import { useStateValue } from "../../assets/utility/StateProvider";
import { getTotal } from "../../assets/functions";
import { validate } from "../Form/ValidateHomeForm";
import ValidationError from "../ValidationError/ValidationError";
import firebase from "firebase";

function CreateInvoice() {
  const [count, setCount] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());
  const [order, setOrder] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState(today());
  const [nameBuyer, setNameBuyer] = useState("");
  const [streetBuyer, setStreetBuyer] = useState("");
  const [zipcodeBuyer, setZipcodeBuyer] = useState("");
  const [townBuyer, setTownBuyer] = useState("");
  const [nip, setNip] = useState("");
  const [seller, setSeller] = useState("Małgorzata Kamińska");
  const [selected, setSelected] = useState("przelew");
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  //ilość
  const [quantity, setQuantity] = useState(1);

  const [{ user, amount, numberInvoice }, dispatch] = useStateValue();

  useEffect(() => {
    if (amount) {
      setCount(amount);
    } else setCount(1);
  }, [amount]);

  useEffect(() => {
    dispatch({
      type: "INVOICE_NUMBER",
      count: amount || count,
      year: year,
      order: order,
    });
    setNumber(numberInvoice);
  }, [dispatch, order, year, amount, numberInvoice, count]);

  //validation error
  const [error, setError] = useState("");

  const history = useNavigate();

  const index = () => {
    return `Invoice-${nanoid(10)}`;
  };

  const addInvoice = async (e) => {
    e.preventDefault();
    const msg = validate(
      count,
      year,
      date,
      nameBuyer,
      streetBuyer,
      zipcodeBuyer,
      townBuyer,
      seller
    );
    if (msg) {
      setError(msg);
      return;
    }

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
          nip: nip,
        },
        seller: seller,
        products: products,
      })
      .then(() => {
        dispatch({ type: "ALERT_ADD_INVOICE" });
        history("/invoices");
      })
      .catch((error) => {
        dispatch({ type: "ALERT_ERROR", item: error.message });
      });

    db.collection("invoices")
      .doc(user?.uid)
      .collection("number")
      .doc("YgYuBDoz5AisskTWslyB")
      .update({
        count: firebase.firestore.FieldValue.increment(1),
      })
      .then(() => console.log("Edytowano :)"))
      .catch((error) => {
        console.log(error.message);
        dispatch({ type: "ALERT__ERROR", item: error.message });
      });
  };

  return (
    <div className="createinvoice">
      {error ? <ValidationError text={error} /> : null}
      <h2 className="createinvoice__text">Wprowadzanie danych</h2>
      <Form>
        <FormTop
          date={date}
          setDate={setDate}
          count={count}
          year={year}
          order={order}
          setOrder={setOrder}
          number={number}
        />
        <div className="createinvoice__wrapper">
          <FormBuyer
            nameBuyer={nameBuyer}
            setNameBuyer={setNameBuyer}
            streetBuyer={streetBuyer}
            setStreetBuyer={setStreetBuyer}
            zipcodeBuyer={zipcodeBuyer}
            setZipcodeBuyer={setZipcodeBuyer}
            townBuyer={townBuyer}
            setTownBuyer={setTownBuyer}
            nip={nip}
            setNip={setNip}
          />
          <FormSeller seller={seller} setSeller={setSeller} />
        </div>
        <FormPayment selected={selected} setSelected={setSelected} />
        <FormProducts
          title={title}
          setTitle={setTitle}
          quantity={quantity}
          price={price}
          setPrice={setPrice}
          setProducts={setProducts}
          products={products}
          setQuantity={setQuantity}
        />
        {products.length !== 0 ? (
          <div>
            <ViewProducts products={products} setProducts={setProducts} />
            <div className="createinvoice__footer">
              <div className="creativeinvoice__summary">
                Razem: {Number.parseFloat(getTotal(products)).toFixed(2)} zł
              </div>
              <button
                type="button"
                onClick={addInvoice}
                className="createinvoice__button createinvoice__addInvoice"
              >
                Dodaj fakturę
              </button>
            </div>
          </div>
        ) : null}
      </Form>
    </div>
  );
}

export default CreateInvoice;

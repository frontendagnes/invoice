import React, { useState, useEffect } from "react";
import "./CreateInvoice.css";
import Form from "../Form/Form";
import FormTop from "../Form/FormTop/FormTop";
import FormPerson from "../Form/FormPerson/FormPerson";
import FormPayment from "../Form/FormPaymnet/FormPayment";
import FormProducts from "../Form/FormProducts/FormProducts";
import ViewProducts from "../Form/ViewProducts.js/ViewProducts";
import { useNavigate } from "react-router-dom";
import { today } from "../../assets/functions";
import { db } from "../../assets/utility/firebase";
import { useStateValue } from "../../assets/utility/StateProvider";
import { getTotal } from "../../assets/functions";
import { validate } from "../Form/ValidateHomeForm";
import ValidationError from "../ValidationError/ValidationError";
import {
  doc,
  collection,
  addDoc,
  increment,
  updateDoc,
  setDoc,
} from "../../assets/utility/firebase";

function CreateInvoice() {
  const [count, setCount] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());
  const [order, setOrder] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState(today());
  const [buyer, setBuyer] = useState({
    name: "",
    street: "",
    zipcode: "",
    town: "",
    nip: "",
  });
  const [seller, setSeller] = useState({
    name: "",
    street: "",
    zipcode: "",
    town: "",
    nip: "",
  });
  const [selected, setSelected] = useState("przelew");
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  //ilość
  const [quantity, setQuantity] = useState(1);
  const [{ user, amount, numberInvoice }, dispatch] = useStateValue();
  //validation error
  const [error, setError] = useState("");
  const history = useNavigate();

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

  const handleChangeSeller = (e) => {
    const value = e.target.value;
    setSeller({
      ...seller,
      [e.target.name]: value,
    });
  };
  const handleChangeBuyer = (e) => {
    const value = e.target.value;
    setBuyer({
      ...buyer,
      [e.target.name]: value,
    });
  };
  const addInvoice = async (e) => {
    e.preventDefault();
    const msg = validate(
      count,
      year,
      date,
      buyer.name,
      buyer.street,
      buyer.zipcode,
      buyer.town,
      seller.name
    );
    if (msg) {
      setError(msg);
      return;
    }

    const docRef = doc(db, "invoices", user.uid);
    const ref = collection(docRef, "invoice");
    await addDoc(ref, {
      date: date,
      number: number,
      payment: selected,
      buyer: {
        name: buyer.name,
        street: buyer.street,
        zipcode: buyer.zipcode,
        town: buyer.town,
        nip: buyer.nip,
      },
      products: products,
    })
      .then(() => {
        dispatch({ type: "ALERT_ADD_INVOICE" });
        history("/invoices");
      })
      .catch((error) => {
        dispatch({ type: "ALERT_ERROR", item: error.message });
      });
    const refSeller = collection(docRef, "seller");
    await setDoc(refSeller, {
      seller: {
        name: seller.name,
        street: seller.street,
        zipcode: seller.zipcode,
        town: seller.town,
        nip: seller.nip,
      },
    });
    // editing invoice number
    const updateRef = doc(
      db,
      `invoices/${user.uid}/number/YgYuBDoz5AisskTWslyB`
    );
    await updateDoc(updateRef, {
      count: increment(1),
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
          <FormPerson
            title="Nabywca"
            name={buyer.name}
            street={buyer.street}
            zipcode={buyer.zipcode}
            town={buyer.town}
            nip={buyer.nip}
            handleChange={handleChangeBuyer}
          />
          <FormPerson
            title="Sprzedawca"
            name={seller.name}
            street={seller.street}
            zipcode={seller.zipcode}
            town={seller.town}
            nip={seller.nip}
            handleChange={handleChangeSeller}
          />
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

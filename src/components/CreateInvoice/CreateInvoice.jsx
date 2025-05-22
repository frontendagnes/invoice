import { useEffect, useReducer } from "react";
import "./CreateInvoice.css";

import { useLocalStorage } from "../../assets/utility/storage";
import useFirestore from "../../api/useFirestore/useFirestore";

import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../assets/utility/StateProvider";
import { getTotal } from "../../assets/functions";
import { validate, validateSeller } from "../Form/ValidateHomeForm";

import { increment } from "../../assets/utility/firebase";

import {
  initialState,
  invoiceReducer,
} from "../../api/reducers/invoiceReducer";

//components
import Form from "../Form/Form";
import FormPerson from "../Form/FormPerson/FormPerson";
import FormPayment from "../Form/FormPaymnet/FormPayment";
import FormProducts from "../Form/FormProducts/FormProducts";
import ViewProducts from "../Form/ViewProducts.js/ViewProducts";
import UploadImage from "../UploadImage/UploadImage";
import ButtonToggle from "../Form/ToggleButton/ToggleButton";
import DataPlace from "../Form/FormTop/Right/DataPlace";
import Number from "../Form/FormTop/Left/Number";
import FormButton from "../Form/FormButton/FormButton";
import ValidationError from "../ValidationError/ValidationError";
import FormSelect from "../Form/FormSelect/FormSelect";
import { FooterNote, FooterSummary } from "../Form/FormFooter/FormFooter";

function CreateInvoice() {
  const {
    loading,
    loadingAdd,
    errorFirestore,
    setDocumentField,
    updateDocument,
    addDocument,
  } = useFirestore("invoices");

  const [productsStorage, setProductsStorage] = useLocalStorage("products", []);
  const [place, setPlace] = useLocalStorage("place", "");
  const [{ amount, numberInvoice, salesman }, dispatch] = useStateValue();
  const [state, localDispatch] = useReducer(invoiceReducer, initialState);

  const navigate = useNavigate();

  useEffect(() => {
    // loads the seller
    if (salesman?.length > 0) {
      localDispatch({
        type: "LOAD_SELLER_FROM_DB",
        payload: salesman[0].data.seller,
      });
    }
  }, [salesman]);

  useEffect(() => {
    // checks if there is already an invoice number if yes displays the number taken from the database if not inserts 1
    if (amount) {
      localDispatch({ type: "SET_COUNT", count: amount });
    } else localDispatch({ type: "SET_COUNT", count: 1 });
  }, [amount]);

  // sets the appropriate invoice number
  useEffect(() => {
    dispatch({
      type: "INVOICE_NUMBER",
      count: state.count || amount,
      year: state.year,
      order: state.order,
    });
    localDispatch({ type: "SET_NUMBER", number: numberInvoice });
  }, [dispatch, state.order, state.year, amount, numberInvoice, state.count]);

  //  Remembers the vendor if not already added
  const saveSeller = async () => {
    const msg = validateSeller(state.seller.name);
    if (msg) {
      dispatch({ type: "ALERT__ERROR", item: msg });
      return;
    }
    const data = {
      name: state.seller.name,
      street: state.seller?.street,
      zipcode: state.seller?.zipcode,
      town: state.seller?.town,
      nip: state.seller?.nip,
    };
    setDocumentField("seller", "item-seller123", data, "seller");
    // const refSeller = doc(db, "invoices", user.uid, "seller", "item-seller123");
  };
  // Changes the invoice number to the next
  const changeNumber = async () => {
    try {
      await updateDocument(
        "number",
        "YgYuBDoz5AisskTWslyB",
        { count: increment(1) },
        { count: 2 }
      );
      console.log("Dokument zaktualizowany pomyślnie!");
    } catch (error) {
      console.error("Błąd aktualizacji dokumentu:", error);
      dispatch({ type: "ALERT__ERROR", item: error.message });
    }
  };
  // Sends invoice data to firebase firestore
  const addData = async () => {
    const data = {
      date: state.date,
      number: state.number,
      documentType: state.check ? "RETURN" : "SALE",
      payment: state.selected,
      buyer: {
        name: state.buyer.name,
        street: state.buyer.street,
        zipcode: state.buyer.zipcode,
        town: state.buyer.town,
        nip: state.buyer.nip,
      },
      seller: {
        name: state.seller.name,
        street: state.seller.street,
        zipcode: state.seller.zipcode,
        town: state.seller.town,
        nip: state.seller.nip,
      },
      products: productsStorage,
      place: place,
      note: state.note,
    };
    try {
      await addDocument(data, "invoice");
      dispatch({ type: "ALERT_ADD_INVOICE" });
      navigate("/invoices");
      window.scrollTo(0, 0);
    } catch (err) {
      console.log("Błąd dodawania dokumentu", err);
    }
  };
  // Responsible for adding the invoice
  const addInvoice = async (event, updateNumber = false) => {
    event.preventDefault();
    const msg = validate(
      state.count,
      state.year,
      state.date,
      state.buyer.name,
      state.buyer.street,
      state.buyer.zipcode,
      state.buyer.town
    );
    if (msg) {
      localDispatch({ type: "SET_ERROR", error: msg });
      dispatch({ type: "ALERT__ERROR", item: msg });
      return;
    }
    try {
      await addData();
      if (!updateNumber) await changeNumber();
      window.localStorage.removeItem("products");
    } catch (err) {
      console.log("Błąd dodawania faktury", err.message);
    }
  };
  return (
    <div className="createinvoice">
      {state.error ? (
        <div className="createinvoice__error">
          <ValidationError text={state.error} />
          <ValidationError text={errorFirestore} />
        </div>
      ) : null}
      <div className="createinvoice__prev">
        <ButtonToggle check={state.check} dispach={localDispatch} />
        <UploadImage />
      </div>
      <Form>
        <div className="createinvoice__formtop">
          <Number
            count={state.count}
            dispatch={localDispatch}
            year={state.year}
            order={state.order}
            number={state.number}
          />
          <DataPlace
            date={state.date}
            dispatch={localDispatch}
            place={place}
            setPlace={setPlace}
          />
        </div>
        <div className="createinvoice__wrapper">
          <FormPerson
            title="Nabywca"
            data={state.buyer}
            type="SET_BUYER"
            dispatch={localDispatch}
          />
          <FormPerson
            title="Sprzedawca"
            data={state.seller}
            type="SET_SELLER"
            dispatch={localDispatch}
          />
        </div>
        <div className="creativeinvoice__buttonWrapper">
          {salesman?.length === 0 ? (
            <FormButton
              text={loading ? "Zapamiętuje..." : "Zapamiętaj sprzedawcę"}
              styles={{
                marginTop: "20px",
              }}
              disabled={loading}
              onClick={saveSeller}
            />
          ) : (
            <FormSelect seller={state.seller} />
          )}
        </div>
        <FormPayment selected={state.selected} dispatch={localDispatch} />
        <FormProducts
          title={state.title}
          quantity={state.quantity}
          price={state.price}
          dispatch={localDispatch}
          productsStorage={productsStorage}
          setProductsStorage={setProductsStorage}
        />
        <ViewProducts
          productsStorage={productsStorage}
          setProductsStorage={setProductsStorage}
        />

        <div className="createinvoice__footer">
          <FooterSummary
            getTotal={getTotal}
            productsStorage={productsStorage}
          />
        </div>
        <FooterNote note={state.note} dispatch={localDispatch} />
        <div className="creativeinvoice__buttonAdd">
          <FormButton
            text={loading ? "Dodawanie..." : "Dodaj fakturę"}
            styles={{
              width: "90%",
            }}
            disabled={loadingAdd || productsStorage.length === 0}
            onClick={(e) => addInvoice(e, state.check)}
          />
        </div>
      </Form>
    </div>
  );
}

export default CreateInvoice;

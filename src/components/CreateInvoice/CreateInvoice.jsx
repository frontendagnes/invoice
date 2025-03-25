import React, { useState, useEffect } from "react";
import "./CreateInvoice.css";

import { useLocalStorage } from "../../assets/utility/storage";
import { useNavigate } from "react-router-dom";
import { today } from "../../assets/functions";
import { db } from "../../assets/utility/firebase";
import { useStateValue } from "../../assets/utility/StateProvider";
import { getTotal } from "../../assets/functions";
import { validate, validateSeller } from "../Form/ValidateHomeForm";
import ValidationError from "../ValidationError/ValidationError";

import {
  doc,
  collection,
  addDoc,
  increment,
  updateDoc,
  setDoc,
  getDoc,
} from "../../assets/utility/firebase";
// mui
import { FormControl, TextField, Tooltip } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
// update seller
import {
  updateSellerAll,
  updateSellerField,
} from "../../assets/utility/updateSeller";

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
import { Margin } from "@mui/icons-material";
function CreateInvoice() {
  const [{ user, amount, numberInvoice, salesman }, dispatch] = useStateValue();
  const [productsStorage, setProductsStorage] = useLocalStorage("products", []);
  const [place, setPlace] = useLocalStorage("place", "");
  const [selectName, setSelectName] = useState("");
  const [select, setSelect] = useState("");
  const [check, setCheck] = useState(false);
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
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  //ilość
  const [quantity, setQuantity] = useState(1);

  const [note, setNote] = useState("");

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
      count: count || amount,
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

  const saveSeller = async () => {
    const msg = validateSeller(seller.name);
    if (msg) {
      dispatch({ type: "ALERT__ERROR", item: msg });
      return;
    }
    const refSeller = doc(db, "invoices", user.uid, "seller", "item-seller123");
    await setDoc(refSeller, {
      seller: {
        name: seller.name,
        street: seller?.street,
        zipcode: seller?.zipcode,
        town: seller?.town,
        nip: seller?.nip,
      },
    })
      .then(() => {
        dispatch({
          type: "ALERT_SUCCESS",
          item: "Dane zostały dodane prawidłowo",
        });
      })
      .catch((error) => {
        dispatch({ type: "ALERT__ERROR", item: error.message });
      });
  };

  const updateSeller = () => {
    if (!select) {
      dispatch({
        type: "ALERT__ERROR",
        item: "Nie wybrałeś/aś co chcesz aktualizować",
      });
    }
    const updateFunctions = {
      name: () => updateSellerField(select, seller.name, user, dispatch),
      street: () => updateSellerField(select, seller.street, user, dispatch),
      zipcode: () => updateSellerField(select, seller.zipcode, user, dispatch),
      town: () => updateSellerField(select, seller.town, user, dispatch),
      nip: () => updateSellerField(select, seller.nip, user, dispatch),
      all: () => updateSellerAll(seller, user, dispatch),
    };

    if (updateFunctions[select]) {
      updateFunctions[select]();
    }
    setSelect("");
  };

  const changeNumber = async () => {
    const updateRef = doc(
      db,
      "invoices",
      user.uid,
      "number",
      "YgYuBDoz5AisskTWslyB"
    );

    const docSnap = await getDoc(updateRef);
    const docExist = docSnap.exists();

    if (docExist) {
      await updateDoc(updateRef, {
        count: increment(1),
      })
        .then(() =>
          dispatch({
            type: "ALERT__SUCCESS",
            item: "Numer został zaktualizowany pomyślnie",
          })
        )
        .catch((error) => {
          console.log(error.message);
          dispatch({ type: "ALERT__ERROR", item: error.message });
        });
    } else {
      await setDoc(updateRef, { count: 2 })
        .then(() => console.log("Numer Dodany"))
        .catch((error) => {
          console.log(error.message);
          dispatch({ type: "ALERT__ERROR", item: error.message });
        });
    }
  };

  const addData = async () => {
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
      products: productsStorage,
      place: place,
      note: note,
    })
      .then(() => {
        dispatch({ type: "ALERT_ADD_INVOICE" });
        history("/invoices");
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        dispatch({ type: "ALERT_ERROR", item: error.message });
      });
  };
  const addInvoice = (e) => {
    e.preventDefault();
    const msg = validate(
      count,
      year,
      date,
      buyer.name,
      buyer.street,
      buyer.zipcode,
      buyer.town
    );
    if (msg) {
      setError(msg);
      dispatch({ type: "ALERT__ERROR", item: msg });
      return;
    }
    addData();
    window.localStorage.removeItem("products");
  };
  const addInvoiceWithNumber = (e) => {
    e.preventDefault();
    const msg = validate(
      count,
      year,
      date,
      buyer.name,
      buyer.street,
      buyer.zipcode,
      buyer.town
    );
    if (msg) {
      setError(msg);
      dispatch({ type: "ALERT__ERROR", item: msg });
      return;
    }
    addData();
    changeNumber();
    window.localStorage.removeItem("products");
  };
  const selectChange = (e) => {
    const valueMap = {
      name: "NAZWĘ",
      street: "ULICĘ",
      zipcode: "KOD POCZTOWY",
      town: "MIEJSCOWOŚĆ",
      nip: "NIP",
      "": "",
    };
    const newValue = e.target.value;
    setSelect(newValue);
    setSelectName(valueMap[newValue] || "");
  };
  return (
    <div className="createinvoice">
      {error ? (
        <div className="createinvoice__error">
          <ValidationError text={error} />
        </div>
      ) : null}
      {/* <h2>Wprowadzanie danych</h2> */}
      <div className="createinvoice__prev">
        <ButtonToggle check={check} setCheck={setCheck} />
        <UploadImage />
      </div>
      <Form>
        <div className="createinvoice__formtop">
          <Number
            count={count}
            setCount={setCount}
            year={year}
            order={order}
            setOrder={setOrder}
            number={number}
          />
          <DataPlace
            date={date}
            setDate={setDate}
            place={place}
            setPlace={setPlace}
          />
        </div>
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
          {!salesman || salesman.length === 0 ? (
            <FormPerson
              title="Sprzedawca"
              name={seller.name}
              street={seller.street}
              zipcode={seller.zipcode}
              town={seller.town}
              nip={seller.nip}
              handleChange={handleChangeSeller}
            />
          ) : (
            salesman?.map((item) => (
              <FormPerson
                key={item.id}
                title="Sprzedawca"
                name={seller.name || item.data.seller.name}
                street={seller.street || item.data.seller.street}
                zipcode={seller.zipcode || item.data.seller.zipcode}
                town={seller.town || item.data.seller.town}
                nip={seller.nip || item.data.seller.nip}
                handleChange={handleChangeSeller}
              />
            ))
          )}
        </div>
        <div className="creativeinvoice__buttonWrapper">
          {salesman?.length === 0 ? (
            <FormButton
              text="Zapamiętaj sprzedawcę"
              styles={{
                marginTop: "20px",
              }}
              onClick={saveSeller}
            />
          ) : (
            <div className="createinvoice__selectSeller">
              <FormControl fullWidth>
                <InputLabel>Wybierz co chcesz aktualizować</InputLabel>
                <Select
                  name="seller-option"
                  value={select}
                  onChange={selectChange}
                  label="Wybierz co chcesz aktualizować"
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="name">Aktualizacja Nazwy</MenuItem>
                  <MenuItem value="street">Aktualizacja Ulicy</MenuItem>
                  <MenuItem value="zipcode">Aktualizacja Kodu</MenuItem>
                  <MenuItem value="town">Aktualizacja Miejscowości</MenuItem>
                  <MenuItem value="nip">Aktualizacja Nip-u</MenuItem>
                  <MenuItem value="all">Aktualizuj Wszytkie Pola</MenuItem>
                </Select>
              </FormControl>
              <Tooltip
                title="UWAGA! Zmieniasz dane we wszystkich dotychczas wystawionych dokumentach"
                placement="bottom"
                followCursor={true}
              >
                <FormButton
                  text={`Aktualizuj ${selectName}`}
                  styles={{
                    marginTop: "20px",
                  }}
                  onClick={updateSeller}
                />
              </Tooltip>
            </div>
          )}
        </div>
        <FormPayment selected={selected} setSelected={setSelected} />
        <FormProducts
          title={title}
          setTitle={setTitle}
          quantity={quantity}
          price={price}
          setPrice={setPrice}
          setQuantity={setQuantity}
          productsStorage={productsStorage}
          setProductsStorage={setProductsStorage}
        />
        {productsStorage.length !== 0 ? (
          <div>
            <ViewProducts
              productsStorage={productsStorage}
              setProductsStorage={setProductsStorage}
            />
            <div className="createinvoice__footer">
              <div className="creativeinvoice__summary">
                Razem: {parseFloat(getTotal(productsStorage)).toFixed(2)} zł
              </div>
              <div className="createinvoice__end">
                <div className="note__row">
                  <TextField
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    id="outlined-basic"
                    label="Uwagi (opcjonalne)"
                    placeholder="np. informacja o zwrocie, terminie płatności itp."
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <FormButton
                  text="Dodaj fakturę"
                  styles={{
                    width: "90%",
                  }}
                  onClick={check ? addInvoice : addInvoiceWithNumber}
                />
              </div>
              {/* </FormButton> */}
            </div>
          </div>
        ) : null}
      </Form>
    </div>
  );
}

export default CreateInvoice;

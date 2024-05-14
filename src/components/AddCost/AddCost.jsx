import React, { useState } from "react";
import "./AddCost.css";

import { db, collection, doc, addDoc } from "../../assets/utility/firebase";
import { useStateValue } from "../../assets/utility/StateProvider";
import PropTypes from "prop-types";
//mui
import { Button, TextField } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
//components
import AntySpam from "../AntySpam/AntySpam";
import NumericField from "../NumberComponents/NumericField/NumericField.jsx";
import CostHinsts from "../CostHints/index.jsx";

const validate = (number, contractor, date, amount, test) => {
  if (test) {
    return "Nie przeszedłeś filtra antyspamowego odśwież stronę i spróbuj ponownie";
  }
  if (!number) {
    return "Pole 'Numer Faktury' musi zostać wypełnione";
  }
  if (!contractor) {
    return "Pole 'Kontrahent' musi zostać wypełnione";
  }
  if (!date) {
    return "Pole 'Data' musi zostać wypełnione";
  }
  if (!amount) {
    return "Pole 'Kwota Faktury' musi zostać wypełnione";
  }
};
function AddCost() {
  const [{ user, costHints }, dispatch] = useStateValue();

  const [number, setNumber] = useState("");
  const [contractor, setContractor] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [nip, setNip] = useState("");
  const [test, setTest] = useState("");
  const [isViewTips, setIsViewTips] = useState(false);
  const [tip, setTip] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();

    const msg = validate(number, contractor, date, amount, test);

    if (msg) {
      dispatch({ type: "ALERT__ERROR", item: msg });
      return;
    }

    const docRef = doc(db, "invoices", user.uid);
    const ref = collection(docRef, "costs");
    await addDoc(ref, {
      number: number,
      contractor: contractor,
      date: date,
      amount: parseFloat(amount, 10),
      nip: nip,
    })
      .then(() => dispatch({ type: "ALERT__COSTSOK" }))
      .catch((error) => console.error("ERROR>>", error.massage));

    setNumber("");
    setContractor("");
    setDate("");
    setAmount("");
    setNip("");
  };

  const handleChangeTip = (e) => {
    setTip(e.target.value);
    setIsViewTips(true);
  };
  return (
    <form className="addcost" onClick={() => setIsViewTips(false)}>
      <AntySpam test={test} setTest={setTest} />
      <h2>Dodaj Koszt</h2>
      <div className="addcost__item">
        <TextField
          label="Wpisz nazwę kontrahenta lub jego NIP"
          value={tip}
          onChange={handleChangeTip}
          fullWidth
          helperText="Wyszukaj kontahenta w bazie danych"
        />
        {isViewTips ? (
          <CostHinsts
            data={costHints}
            value={tip}
            setConstractor={setContractor}
            setNip={setNip}
            setIsViewTips={setIsViewTips}
            setValue={setTip}
          />
        ) : null}
      </div>
      <div className="addcost__wrapper">
        <div className="addcost__item">
          <TextField
            label="Kontrahent"
            value={contractor}
            onChange={(e) => setContractor(e.target.value)}
            fullWidth
            helperText="Podaj nazwę Kontahenta"
          />
        </div>
        <div className="addcost__item">
          <NumericField
            format="###-###-##-##"
            mask="_"
            placeholder="___-___-__-__"
            label="NIP"
            value={nip}
            onChange={(e) => setNip(e.target.value)}
            helperText="Podaj numer NIP"
          />
        </div>
        <div className="addcost__item addcost__icon">
          <PersonAddIcon
            fontSize="large"
            color="success"
            titleAccess="Dodaj Kontrahenta do bazy"
          />
          <span>Dodaj kontrahenta do bazy danych (nie wymagane)</span>
        </div>
        <div className="addcost__item">
          <TextField
            label="Numer Faktury"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            fullWidth
            helperText="Podaj numer faktury"
          />
        </div>
        <div className="addcost__item">
          <TextField
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            fullWidth
            helperText="Podaj datę faktury"
          />
        </div>
        <div className="addcost__item">
          <NumericField
            label="Kwota Faktury"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            helperText="Podaj kwotę brutto faktury"
            numeric
          />
        </div>
      </div>
      <Button type="button" onClick={handleClick}>
        Dodaj Koszt
      </Button>
    </form>
  );
}

AddCost.propTypes = {
  amount: PropTypes.number,
  date: PropTypes.string,
  contractor: PropTypes.string,
  number: PropTypes.string,
};

export default AddCost;

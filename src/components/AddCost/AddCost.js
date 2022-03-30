import React, { useState } from "react";
import "./AddCost.css";
import db from "../../assets/utility/firebase";
import { useStateValue } from "../../assets/utility/StateProvider";
import { TextField } from "@mui/material";
import NumberFormat from "react-number-format";
const validate = (number, contractor, date, amount) => {
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
  const [{ costs, user }, dispatch] = useStateValue();

  const [number, setNumber] = useState("");
  const [contractor, setContractor] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const handleClick = (e) => {
    // e.preventDefault();

    const msg = validate(number, contractor, date, amount);

    if (msg) {
      dispatch({ type: "ALERT__ERROR", item: msg });
      return;
    }

    db.collection("invoices")
      .doc(user?.uid)
      .collection("costs")
      .add({
        number: number,
        contractor: contractor,
        date: date,
        amount: amount,
      })
      .then(() => dispatch({ type: "ALERT__COSTSOK" }))
      .catch((error) => console.error("ERROR>>", error.massage));

    setNumber("");
    setContractor("");
    setDate("");
    setAmount("");
  };
  return (
    <form className="addcost">
      <div className="addcost__wrapper">
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
            label="Kontrahent"
            value={contractor}
            onChange={(e) => setContractor(e.target.value)}
            fullWidth
            helperText="Podaj nazwę Kontahenta"
          />
        </div>
        <div className="addcost__item">
          <TextField
            // label="Data Faktury"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            fullWidth
            helperText="Podaj datę faktury"
          />
        </div>
        <div className="addcost__item">
          <NumberFormat
            customInput={TextField}
            label="Kwota Faktury"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            helperText="Podaj kwotę brutto faktury"
          />
        </div>
      </div>
      <button type="button" onClick={handleClick}>
        Dodaj Koszt
      </button>
    </form>
  );
}

export default AddCost;

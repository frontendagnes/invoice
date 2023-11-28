import React, { useState } from "react";
import "./AddCost.css";
import AntySpam from "../AntySpam/AntySpam";
import { db, collection, doc, addDoc } from "../../assets/utility/firebase";
import { useStateValue } from "../../assets/utility/StateProvider";
import { Button, TextField } from "@mui/material";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

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
  const [{ user }, dispatch] = useStateValue();

  const [number, setNumber] = useState("");
  const [contractor, setContractor] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [nip, setNip] = useState("");
  const [test, setTest] = useState("");

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
  return (
    <form className="addcost">
      <AntySpam test={test} setTest={setTest} />
      <h2>Dodaj Koszt</h2>
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
          <NumberFormat
            customInput={TextField}
            format="###-###-##-##"
            mask="_"
            placeholder="___-___-__-__"
            label="NIP"
            value={nip}
            onChange={(e) => setNip(e.target.value)}
            helperText="Podaj numer NIP"
            fullWidth
          />
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
          <NumberFormat
            customInput={TextField}
            allowedDecimalSeparators={[",", "."]}
            label="Kwota Faktury"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            helperText="Podaj kwotę brutto faktury"
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

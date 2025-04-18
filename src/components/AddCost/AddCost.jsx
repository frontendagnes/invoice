import React, { useEffect, useState } from "react";
import "./AddCost.css";

import {
  db,
  collection,
  doc,
  addDoc,
  onSnapshot,
} from "../../assets/utility/firebase";
import { useStateValue } from "../../assets/utility/StateProvider";
import PropTypes from "prop-types";
//mui
import { Button, TextField } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
//components
import AntySpam from "../AntySpam/AntySpam";
import NumericField from "../NumberComponents/NumericField/NumericField.jsx";
import CostHints from "../CostHints/index.jsx";

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

const validateContractor = (contractor, test) => {
  if (test) {
    return "Nie przeszedłeś filtra antyspamowego odśwież stronę i spróbuj ponownie";
  }
  if (!contractor) {
    return "Pole 'Kontrahent' musi zostać wypełnione";
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

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "invoices", user?.uid);
      const ref = collection(docRef, "contractors");
      const unsb = onSnapshot(ref, (snap) => {
        dispatch({
          type: "SET_COSTHINTS",
          item: snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        });
      });
      return () => {
        unsb();
      };
    }
  }, [user, dispatch]);

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
  const addContractor = async (e) => {
    e.preventDefault();

    const msg = validateContractor(contractor, test);

    if (msg) {
      dispatch({ type: "ALERT__ERROR", item: msg });
      return;
    }

    const docRef = doc(db, "invoices", user.uid);
    const ref = collection(docRef, "contractors");

    await addDoc(ref, {
      contractor: contractor,
      nip: nip,
    })
      .then(() =>
        dispatch({
          type: "ALERT_SUCCESS",
          item: "Kontrachent został dodany poprawnie",
        })
      )
      .catch((error) => console.error("ERROR>>", error.massage));
  };
  const handleChangeTip = (e) => {
    // setTip(e.target.value);
    setContractor(e.target.value);
    setIsViewTips(true);
  };
  return (
    <form className="addcost" onClick={() => setIsViewTips(false)}>
      <AntySpam test={test} setTest={setTest} />
      <h2>Dodaj Koszt</h2>
      <div className="addcost__icon" onClick={addContractor}>
        <PersonAddIcon
          fontSize="large"
          color="success"
          titleAccess="Dodaj Kontrahenta do bazy"
        />
        <span title="Dodaje Nazwę oraz NIP">
          Dodaj kontrahenta do bazy danych (nie wymagane)
        </span>
      </div>
      <div className="addcost__wrapper">
        <div className="addcost__item">
          <TextField
            label="Kontrahent"
            value={contractor}
            onChange={handleChangeTip}
            fullWidth
            helperText="Podaj nazwę Kontahenta"
          />
          {isViewTips ? (
            <CostHints
              data={costHints}
              value={contractor}
              setConstractor={setContractor}
              setNip={setNip}
              setIsViewTips={setIsViewTips}
              setValue={setContractor}
            />
          ) : null}
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

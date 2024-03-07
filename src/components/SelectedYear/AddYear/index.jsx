import React, { useState } from "react";
import { useStateValue } from "../../../assets/utility/StateProvider";
// mui
import AddIcon from "@mui/icons-material/Add";

import { db, doc, collection, addDoc } from "../../../assets/utility/firebase";
//componets
import ValidationError from "../../ValidationError/ValidationError.jsx";
import { validate } from "./validete.jsx";
import { TextField } from "@mui/material";
function AddYear() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const [{ user, yearArray }, dispatch] = useStateValue();

  const addData = async () => {
    dispatch({ type: "CLEAR_YEAR" });
    const docRef = doc(db, "invoices", user.uid);
    const ref = collection(docRef, "years");
    await addDoc(ref, {
      year: parseInt(value),
    })
      .then(() => {
        dispatch({
          type: "ALERT_SUCCESS",
          item: "Rok został dodany prawidłowo",
        });
        setValue("");
      })
      .catch((error) => {
        console.log("Errorr Add Year", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const msg = validate(value, yearArray);
    if (msg) {
      setError(msg);
      return;
    }
    setError(null);
    // addData();
    console.log("Dodano", value.length, value);
  };
  return (
    <>
      <form>
        <div className="selectedYear__input">
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label="Wpisz Rok"
            placeholder="np. 2024"
            fullWidth
          />
        </div>
        <AddIcon
          onClick={handleSubmit}
          sx={{ cursor: "pointer" }}
          fontSize="large"
          color="success"
        />
      </form>
      {error ? <ValidationError text={error} /> : null}
    </>
  );
}

export default AddYear;

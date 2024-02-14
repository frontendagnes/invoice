import React, { useState } from "react";
import { useStateValue } from "../../../assets/utility/StateProvider";
// mui
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import {
  db,
  doc,
  collection,
  addDoc,
  increment,
  updateDoc,
  setDoc,
  getDoc,
} from "../../../assets/utility/firebase";
function AddYear() {
  const [value, setValue] = useState("");
  const [{ yearArray, user }, dispatch] = useStateValue();

  const addData = async () => {
    const docRef = doc(db, "invoices", user.uid);
    const ref = collection(docRef, "years");
    await addDoc(ref, {
      year: parseInt(value),
    })
      .then(() => console.log("Rok Dodany"))
      .catch((error) => {
        console.log("Errorr Add Year", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      //   updateYearsArray();
      dispatch({ type: "SET_YEAR", item: value });
      console.log(yearArray);
      addData();
    } else {
      console.log("Value jest puste");
      return;
    }
  };
  return (
    <form>
      <div className="selectedYear__input">
        <TextField
          variant="outlined"
          type="text"
          name="year"
          placeholder="Wpisz rok"
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
  );
}

export default AddYear;

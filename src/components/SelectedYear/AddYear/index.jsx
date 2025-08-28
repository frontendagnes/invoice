import { useState } from "react";
import { useStateValue } from "../../../state/StateProvider";
import { validate } from "./validete.jsx";
import useFirestore from "../../../api/useFirestore/useFirestore.jsx";
// mui
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField } from "@mui/material";
//componets
import ValidationError from "../../ValidationError/ValidationError.jsx";
import Tooltip from "../../Tooltip/Tooltip.jsx";

const CURRENT_YEAR = new Date().getFullYear();

function AddYear() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const { VITE_INVOICE_COUNTER_ID } = import.meta.env;
  const [{ yearArray }, dispatch] = useStateValue();
  const {
    addDocument,
    updateDocument,
    loading,
    error: firestoreError,
  } = useFirestore("invoices");

  const addData = async () => {
    dispatch({ type: "CLEAR_YEAR" });
    setError(null);

    const data = {
      year: parseInt(value),
    };

    await addDocument(data, "years");
    dispatch({
      type: "ALERT_SUCCESS",
      item: "Rok został dodany prawidłowo",
    });
    setValue("");
  };

  const resetInvoiceCounter = async () => {
    const data = {
      count: 1,
    };
    await updateDocument("number", VITE_INVOICE_COUNTER_ID, data);
    dispatch({
      type: "ALERT_SUCCESS",
      item: "Numer faktury został zresetowany",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const msg = validate(value, yearArray);
    if (msg) {
      setError(msg);
      return;
    }
    addData();
    if (value === CURRENT_YEAR) {
      resetInvoiceCounter();
    }
  };

  return (
    <>
      <h3>Dodaj Nowy Rok</h3>
      <form onSubmit={handleSubmit}>
        <div className="selectedYear__input">
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label="Wpisz Rok"
            placeholder={`np. ${CURRENT_YEAR}`}
            error={!!error}
            fullWidth
          />
        </div>
        <Tooltip text={loading ? "Dodaję Rok" : "Dodaj Rok"}>
          {loading ? (
            <CircularProgress
              sx={{ margin: "0 auto", display: "block", color: "#4caf50" }}
            />
          ) : (
            <AddIcon
              onClick={handleSubmit}
              sx={{ cursor: "pointer" }}
              fontSize="large"
              color="success"
            />
          )}
        </Tooltip>
      </form>
      {error ? <ValidationError text={error} /> : null}
      {firestoreError ? <ValidationError text={firestoreError} /> : null}
    </>
  );
}

export default AddYear;

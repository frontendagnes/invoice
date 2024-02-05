import React, {  useState } from "react";
import "./Invoices.css";
import { useNavigate } from "react-router-dom";
import { db, deleteDoc, doc } from "../../assets/utility/firebase";
import { useStateValue } from "../../assets/utility/StateProvider";
import { getTotal, today } from "../../assets/functions";
// components
import InvoicesItem from "../InvoicesItem/InvoicesItem";
// mui
import { TextField } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

function Invoices({ data }) {
  const [{ user }, dispatch] = useStateValue();
  const [text, setText] = useState("");
  const [anyDate, setAnyDate] = useState(today());

  const history = useNavigate();

  const resetDate = () => {
    setAnyDate(today());
  };
  const openDetails = (details) => {
    history(`/invoice/${details}`);
  };
  const deleteItem = async (itemId) => {
    await deleteDoc(doc(db, "invoices", user.uid, "invoice", itemId))
      .then(() => {
        dispatch({ type: "ALERT_DELETE" });
      })
      .catch((error) =>
        dispatch({ type: "ALERT__ERROR", item: error.message })
      );
  };

  return (
    <div className="invoices">
      <div className="invoices__dataFilter">
        <h2>Wyszukaj faktury wg daty</h2>
        <div className="datefilter__input">
          <div className="datefilter__input--width">
            <TextField
              type="date"
              value={anyDate}
              onChange={(e) => setAnyDate(e.target.value)}
              fullWidth
            />
          </div>
          <RemoveCircleIcon
            onClick={resetDate}
            color="error"
            fontSize="large"
            className="datefilter__button"
          />
        </div>

        {data
          .filter((item) => item.data.date === anyDate)
          .map((item) => (
            <InvoicesItem
              key={item.id}
              optionalValue={item.data.note}
              name={item.data.buyer.name}
              number={item.data.number}
              index={item.id}
              date={item.data.date}
              noteCnt={item.data.note}
              openDetails={openDetails}
              deleteItem={deleteItem}
              amount={getTotal(item.data.products)}
            />
          ))}
      </div>
      <div className="invoices__nameFilter">
        <h2>Zestawienie faktur</h2>
        <div className="namefilter__input">
          <TextField
            type="text"
            vlaue={text}
            onChange={(e) => setText(e.target.value)}
            id="outlined-basic"
            label="Wyszukaj wpisując kontrahenta lub numer faktury"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
        </div>
        {data
          .sort(
            (a, b) =>
              new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
          )
          .filter(
            (item) =>
              item.data.buyer.name.toLowerCase().includes(text.toLowerCase()) ||
              item.data.number.toLowerCase().includes(text.toLowerCase())
          )
          .map((item) => (
            <InvoicesItem
              key={item.id}
              optionalValue={item.data.note}
              name={item.data.buyer.name}
              number={item.data.number}
              index={item.id}
              date={item.data.date}
              noteCnt={item.data?.note}
              openDetails={openDetails}
              deleteItem={deleteItem}
              amount={getTotal(item.data.products)}
            />
          ))}
      </div>
    </div>
  );
}

export default Invoices;

import React from "react";
import "./Invoices.css";
import { useNavigate } from "react-router-dom";
import { db, deleteDoc, doc } from "../../assets/utility/firebase";
import { useStateValue } from "../../assets/utility/StateProvider";
// components
import DateFilter from "../DateFilter/DateFilter";
import NameFilter from "../NameFilter/NameFilter";

function Invoices({ data }) {
  const [{ user }, dispatch] = useStateValue();

  const history = useNavigate();

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
      <h2>Wyszukaj faktury wg daty</h2>
      <DateFilter
        data={data}
        deleteItem={deleteItem}
        openDetails={openDetails}
        isCost={false}
      />
      <h2>Zestawienie faktur</h2>
      <NameFilter
        data={data}
        openDetails={openDetails}
        deleteItem={deleteItem}
        isCost={false}
      />
    </div>
  );
}

export default Invoices;

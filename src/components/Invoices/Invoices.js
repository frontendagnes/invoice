import React from "react";
import "./Invoices.css";
import { useNavigate } from "react-router-dom";
import { db } from "../../assets/utility/firebase";
import { useStateValue } from "../../assets/utility/StateProvider";

import DateFilter from "../DateFilter/DateFilter";
import NameFilter from "../NameFilter/NameFilter";
function Invoices({ data }) {
  const [{ user }, dispatch] = useStateValue();

  const history = useNavigate();
  const openDetails = (detail) => {
    history(`/invoice/${detail}`);
  };
  const deleteItem = (itemId) => {
    db.collection("invoices")
      .doc(user.uid)
      .collection("invoice")
      .doc(itemId)
      .delete()
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
      />
      <h2>Zestawienie faktur</h2>
      <NameFilter
        data={data}
        openDetails={openDetails}
        deleteItem={deleteItem}
      />
    </div>
  );
}

export default Invoices;

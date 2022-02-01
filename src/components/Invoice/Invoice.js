import React from "react";
import "./Invoice.css";
import { Outlet, Link } from "react-router-dom";
function Invoice() {
  return (
    <div className="invoice">
      <div className="invoice_wrapper">
        <h2>Podgląd faktury</h2>
        <Link to="/invoices">Wróć do zestawienia faktur</Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Invoice;

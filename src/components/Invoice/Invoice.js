import React from "react";
import "./Invoice.css";
import { Outlet, Link } from "react-router-dom";
import GoHome from "../GoHomeButton/GoHome.js";

function Invoice() {
  return (
    <div className="invoice">
      <div className="invoice_wrapper">
        <div>
          <GoHome />
          <h2>Podgląd faktury</h2>
        </div>
        <Link to="/invoices">Zestawienie faktur</Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Invoice;

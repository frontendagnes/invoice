import React from "react";
import "./Invoice.css";
import { Outlet } from "react-router-dom";

function Invoice() {
  return (
    <div className="invoice">
      <Outlet />
    </div>
  );
}

export default Invoice;

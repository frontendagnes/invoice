import React from "react";
import "./Invoices.css";
import { Link } from "react-router-dom";
function Invoices({ data }) {
  return (
    <div className="invoices">
      <h1>Zestawienie Faktur</h1>
      {data?.map((item) => (
        <div className="invoices__wrapper" key={item.id}>
          <p>Identyfiaktor: {item.id}</p>
          <Link to={`/invoice/${item.id}`}>
            <p>Numer Faktury: {item.data.number}</p>
          </Link>
          <p>Data wystawienie: {item.data.date}</p>
        </div>
      ))}
    </div>
  );
}

export default Invoices;

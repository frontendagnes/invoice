import React from "react";
import "./Cost.css";

function Cost({ number, contractor, date, amount }) {
  return (
    <div className="cost">
      <div className="cost__item">
        <span>Numer Faktury:</span> {number}
      </div>
      <div className="cost__item">
        <span>Kontrahent:</span> {contractor}
      </div>
      <div className="cost__item">
        <span>Data wystawienia:</span> {new Date(date).toLocaleDateString()}
      </div>
      <div className="cost__item">
        <span>Wartość:</span> {Number.parseFloat(amount).toFixed(2)} zł
      </div>
    </div>
  );
}

export default Cost;

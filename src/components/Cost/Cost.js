import React from "react";
import "./Cost.css";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
function Cost({ number, contractor, date, amount, deleteItem, index, nip }) {
  return (
    <div className="cost">
      <div className="cost__item">
        Numer Faktury: <span>{number}</span>
      </div>
      <div className="cost__item">
        Kontrahent: <span>{contractor}</span>
      </div>

      <div className="cost__item">
        {nip ? (
          <>
            NIP: <span>{nip}</span>
          </>
        ) : "Brak NIP"}
      </div>
      <div className="cost__item">
        Data wystawienia: <span>{new Date(date).toLocaleDateString()}</span>
      </div>
      <div className="cost__item">
        Wartość: <span>{Number.parseFloat(amount).toFixed(2)} zł</span>
      </div>
      <div className="cost__icons">
        <RemoveCircleIcon
          onClick={() => deleteItem(index)}
          color="error"
          fontSize="medium"
        />
      </div>
    </div>
  );
}

export default Cost;

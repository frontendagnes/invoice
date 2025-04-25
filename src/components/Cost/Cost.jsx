import React, { useMemo } from "react";
import "./Cost.css";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DisplayingNumber from "../NumberComponents/DisplayingNumber/DisplayingNumber";
import Tooltip from "../Tooltip/Tooltip";
function Cost({ number, contractor, date, amount, deleteItem, id, nip }) {
  const formattedDate = useMemo(
    () => new Date(date).toLocaleDateString(),
    [date]
  );
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
        ) : (
          "Brak NIP"
        )}
      </div>
      <div className="cost__item">
        Data wystawienia: <span>{formattedDate}</span>
      </div>
      <div className="cost__item">
        Wartość:{" "}
        <DisplayingNumber
          value={amount}
          renderText={(value) => (
            <b>{Number.parseFloat(value || 0).toFixed(2)} zł</b>
          )}
        />
      </div>
      <div className="cost__icons">
        <Tooltip text="Usuń koszt">
          <RemoveCircleIcon
            onClick={() => deleteItem(id)}
            color="error"
            fontSize="medium"
          />
        </Tooltip>
      </div>
    </div>
  );
}

export default Cost;

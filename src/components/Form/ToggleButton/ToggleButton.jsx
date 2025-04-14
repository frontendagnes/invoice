import React from "react";
import "./ToggleButton.css";
import { ToggleButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
function ButtonToggle({ check, dispach }) {
  const handleChange = () => {
    dispach({ type: "SET_CHECK", check: !check});
  };
  return (
    <div className="buttonToggle">
      <div className="buttonToggle__info">
        Zaznacz jeżeli chcesz użyć innego niż standardowy numer faktury np.
        wprowadzasz zwrot, regularny numer nie ulegnie wtedy zmianie (domyślnie
        wyłączone).
      </div>
      <ToggleButton value="check" selected={check} onChange={handleChange}>
        <CheckIcon color={!check ? "error" : "success"} />
        {!check ? (
          <span style={{ color: "#ff0000" }}>OFF</span>
        ) : (
          <span style={{ color: "#008000" }}>ON</span>
        )}
      </ToggleButton>
    </div>
  );
}

export default ButtonToggle;

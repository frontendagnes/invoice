import React from "react";
import "./SelectedYear.css";

//components
import Select from "./Select";
import AddYear from "./AddYear";

function SelectedYear() {
  return (
    <>
      <div className="selectedYear">
        <div className="selectedYear__addYear">
          <h3>Dodaj Nowy Rok</h3>
          <AddYear />
        </div>
        <div className="selectedYear__select">
          <h3>Wybierz Rok który chcesz sprawdzić</h3>
          <Select />
        </div>
      </div>
    </>
  );
}

export default SelectedYear;

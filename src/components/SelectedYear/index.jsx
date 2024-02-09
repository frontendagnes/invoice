import React, { useState, useEffect } from "react";
import "./SelectedYear.css";

import { useStateValue } from "../../assets/utility/StateProvider";
//mui
import { TextField } from "@mui/material";
import NativeSelect from "@mui/material/NativeSelect";

//components
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function SelectedYear() {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState("");
  const [years, setYears] = useState([]);

  const [{ selectedYear }, dispatch] = useStateValue();
  useEffect(() => {
    console.log("selected", selected);
    console.log("year", selectedYear);
    console.log("arr", years);
  }, [selected, selectedYear, years]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch({ type: "SELECTED_YEAR", item: parseInt(value) });
    years.push(value);
  };

  const handleSelect = (e) => {
    setSelected(e.target.value);
    dispatch({ type: "SELECTED_YEAR", item: parseInt(selected) });
  };
  return (
    <>
      <Header />
      <div className="selectedYear">
        <form onSubmit={handleSubmit}>
          <div className="selectedYear__input">
            <label htmlFor="year">Wpisz Rok</label>
            <input
              type="text"
              name="year"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <input type="submit" value="Zatwierdź" />
        </form>
        <NativeSelect
          name="selected-year"
          value={selected}
          onChange={handleSelect}
        >
          <option value="">Wybierz rok...</option>
          {/* <option value="2023">2023</option>
          <option value="2024">2024</option> */}
          {years.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </NativeSelect>
      </div>
      <Footer />
    </>
  );
}

export default SelectedYear;

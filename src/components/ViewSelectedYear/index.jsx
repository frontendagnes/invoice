import React from "react";
import "./ViewSelectedYers.css";
import { useStateValue } from "../../assets/utility/StateProvider";
// import { Link } from "react-router-dom";
//mui
import NativeSelect from "@mui/material/NativeSelect";
// import SettingsIcon from "@mui/icons-material/Settings";


function ViewSelectedYear() {
  const [{ selectedYear, yearArray }, dispatch] = useStateValue();
  const handleChange = (e) => {
    dispatch({ type: "SELECTED_YEAR", item: Number(e.target.value) });
  };
  return (
    <div className="viewSelectedYear">
      <NativeSelect
        name="years"
        id="years"
        onChange={handleChange}
        sx={{
          width: "100px",
        }}
        value={selectedYear}
      >
        {yearArray
          .sort((a, b) => b.data.year - a.data.year)
          .map((item) => (
            <option key={item.id} value={item.data.year}>
              {item.data.year}
            </option>
          ))}
      </NativeSelect>
      {/*
        tymczasowo wyłączona - komponet istnieje
        czy potrzbnie skoro rok zmienia się w selekcie?
        Do przemyślenia!! */}
      {/* <Link to="/selected-year">
        <SettingsIcon
          sx={{ color: "#808080", cursor: "pointer" }}
          titleAccess="Ustawienia"
          fontSize="medium"
        />
      </Link> */}
    </div>
  );
}

export default ViewSelectedYear;

import React, { useState } from "react";
import "./DateFilter.css";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import InvoicesItem from "../InvoicesItem/InvoicesItem";
import { TextField } from "@mui/material";

function DateFilter({ data, openDetails, deleteItem }) {
  const [anyDate, setAnyDate] = useState("");

  const resetDate = () => {
    setAnyDate("");
  };
  return (
    <div className="datefilter">
      <div className="datefilter__input">
        <div className="datefilter__input--width">
          <TextField
            type="date"
            value={anyDate}
            onChange={(e) => setAnyDate(e.target.value)}
            fullWidth
          />
        </div>
        <RemoveCircleIcon
          onClick={resetDate}
          color="error"
          fontSize="large"
          className="datefilter__button"
        />
      </div>
      {data
        .filter((item) => item.data.date === anyDate)
        .map((item) => (
          <InvoicesItem
            key={item.id}
            name={item.data.buyer.name}
            number={item.data.number}
            index={item.id}
            date={item.data.date}
            openDetails={openDetails}
            deleteItem={deleteItem}
          />
        ))}
    </div>
  );
}

export default DateFilter;

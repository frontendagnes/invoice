import React, { useState } from "react";
import "./DateFilter.css";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import InvoicesItem from "../InvoicesItem/InvoicesItem";
import { TextField } from "@mui/material";
import { today } from "../../assets/functions";
import Cost from "../Cost/Cost";
function DateFilter({ data, openDetails, deleteItem, isCost }) {
  const [anyDate, setAnyDate] = useState(today());
  const resetDate = () => {
    setAnyDate(today());
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
      {isCost
        ? data
            .filter((item) => item.data.date === anyDate)
            .map((item) => (
              <Cost
                key={item.id}
                index={item.id}
                number={item.data.number}
                contractor={item.data.contractor}
                date={item.data.date}
                amount={item.data.amount}
                deleteItem={deleteItem}
              />
            ))
        : data
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

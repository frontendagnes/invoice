import React, { useState } from "react";
import "./NameFilter.css";
import { TextField } from "@mui/material";
import InvoicesItem from "../InvoicesItem/InvoicesItem";
import Cost from "../Cost/Cost";
function NameFilter({ data, openDetails, deleteItem, isCost }) {
  const [text, setText] = useState("");
  return (
    <div>
      <div className="namefilter__input">
        <TextField
          type="text"
          vlaue={text}
          onChange={(e) => setText(e.target.value)}
          id="outlined-basic"
          label="Wyszukaj wpisując kontrahenta lub numer faktury"
          variant="outlined"
          autoComplete="off"
          fullWidth
        />
      </div>

      {isCost
        ? data
            .filter(
              (item) =>
                item.data.contractor
                  .toLowerCase()
                  .includes(text.toLowerCase()) ||
                item.data.number.toLowerCase().includes(text.toLowerCase())
            )
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
            .filter(
              (item) =>
                item.data.buyer.name
                  .toLowerCase()
                  .includes(text.toLowerCase()) ||
                item.data.number.toLowerCase().includes(text.toLowerCase())
            )
            .map((item) => (
              <InvoicesItem
                key={item.id}
                name={item.data.buyer.name}
                number={item.data.number}
                index={item.id}
                date={item.data.date}
                note={item.data.note}
                openDetails={openDetails}
                deleteItem={deleteItem}
              />
            ))}
    </div>
  );
}

export default NameFilter;

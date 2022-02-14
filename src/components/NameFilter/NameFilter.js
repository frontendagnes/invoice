import React, { useState } from "react";
import "./NameFilter.css"
import { TextField } from "@mui/material";
import InvoicesItem from "../InvoicesItem/InvoicesItem";
function NameFilter({ data, openDetails, deleteItem }) {
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
      {data
        .filter(
          (item) =>
            item.data.buyer.name.toLowerCase().includes(text.toLowerCase()) ||
            item.data.number.toLowerCase().includes(text.toLowerCase())
        )
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

export default NameFilter;

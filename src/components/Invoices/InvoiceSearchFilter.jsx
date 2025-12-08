import { memo } from "react";
import "./Invoices.css";
import { TextField } from "@mui/material";

const InvoiceSearchFilter = ({ searchText, setSearchText }) => {
  return (
    <div className="invoices__nameFilter">
      <div className="namefilter__input">
        <TextField
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          id="outlined-basic"
          label="Wyszukaj wpisując kontrahenta lub numer faktury"
          variant="outlined"
          autoComplete="off"
          fullWidth
        />
      </div>
    </div>
  );
};

export default memo(InvoiceSearchFilter);

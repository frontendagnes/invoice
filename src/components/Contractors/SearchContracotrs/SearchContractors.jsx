import { TextField } from "@mui/material";
import "./SearchContractors.css"
function SearchContractors({ search, setSearch }) {
  return (
    <div className="searchContractors">
      <TextField
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        id="search"
        label="Wyszukaj kontrachenta wpisując nazwę lub NIP"
        variant="outlined"
        fullWidth
      />
    </div>
  );
}

export default SearchContractors;

import React from "react";

//mui
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Button } from "@mui/material";

function AddContractor({ addContractor, loading }) {
  return (
    <Button
      className="addContractor__button"
      onClick={addContractor}
      disabled={loading}
      sx={{ marginBottom: "10px", textTransform: "none", letterSpacing: "2px" }}
    >
      <PersonAddIcon
        fontSize="large"
        color="success"
        titleAccess="Dodaj Kontrahenta do bazy"
      />
      <span title="Dodaje Nazwę oraz NIP">
        {loading
          ? "Dodaje kontrahenta.."
          : " Dodaj kontrahenta do bazy danych (nie wymagane)"}
      </span>
    </Button>
  );
}

export default AddContractor;

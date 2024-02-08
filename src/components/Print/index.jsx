import React from "react";
import "./print.style.css";

//mui
import { Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";

function Print({ onClick }) {
  return (
    <Button type="button" onClick={onClick}>
      <PrintIcon sx={{ marginRight: "5px" }} />
      Drukuj
    </Button>
  );
}

export default Print;

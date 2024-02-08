import React from "react";
import "./print.style.css";

//mui
import { Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";

function Print({ onClick }) {
  return (
    <Button type="button" onClick={onClick}>
      Drukuj <PrintIcon sx={{ marginLeft: "5px" }} />
    </Button>
  );
}

export default Print;

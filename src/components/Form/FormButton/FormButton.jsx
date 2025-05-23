import React from "react";
import Button from "@mui/material/Button";

function FormButton({ text, styles, onClick, disabled, className }) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled}
      className={className}
      sx={{
        letterSpacing: "1px",
        padding: "10px 20px",
        ...styles,
      }}
    >
      {text}
    </Button>
  );
}

export default FormButton;

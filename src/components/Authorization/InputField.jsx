import React from "react";
import TextField from "@mui/material/TextField";

const InputField = ({ name, label, type = "text", value, error, onChange }) => (
  <div className="authoryzation__row">
    <TextField
      name={name}
      type={type}
      label={label}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error}
      variant="outlined"
      fullWidth
    />
  </div>
);

export default InputField;

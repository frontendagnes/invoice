import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const InputField = ({
  name,
  label,
  type = "text",
  value,
  error,
  onChange,
  icon,
  placeholder,
}) => (
  <div className="authoryzation__row">
    <TextField
      name={name}
      type={type}
      label={label}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
      variant="outlined"
      fullWidth
    />
  </div>
);

export default InputField;

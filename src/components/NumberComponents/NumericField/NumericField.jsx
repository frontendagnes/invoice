import React from "react";
import "./NumericField.css";

import { PatternFormat, NumericFormat } from "react-number-format";
import { TextField } from "@mui/material";

function NumericField(props) {
  const {
    value,
    onChange,
    renderText,
    format,
    mask,
    label,
    placeholder,
    name,
    className,
    helperText,
    numeric,
  } = props;
  return (
    <div className="numericField">
      {numeric ? (
        <NumericFormat
          customInput={TextField}
          value={value}
          onChange={onChange}
          label={label}
          placeholder={placeholder}
          name={name}
          renderText={renderText}
          className={className}
          helperText={helperText}
          allowedDecimalSeparators={[",", "."]}
          thousandSeparator={true}
          decimalScale={2}
          fixedDecimalScale={true}
          fullWidth
        />
      ) : (
        <PatternFormat
          customInput={TextField}
          format={format}
          mask={mask}
          value={value}
          onChange={onChange}
          label={label}
          placeholder={placeholder}
          name={name}
          renderText={renderText}
          className={className}
          helperText={helperText}
          fullWidth
        />
      )}
    </div>
  );
}

export default NumericField;

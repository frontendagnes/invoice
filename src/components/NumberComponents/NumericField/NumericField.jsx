// NumericField.jsx

import React from "react";
import "./NumericField.css";

import { PatternFormat, NumericFormat } from "react-number-format";
import { TextField } from "@mui/material";

function NumericField(props) {
  const {
    value,
    onChange, // To jest oryginalne onChange z komponentu rodzica
    renderText,
    format,
    mask,
    label,
    placeholder,
    name,
    className,
    helperText,
    numeric,
    error,
  } = props;

  // Ta funkcja jest wywoływana przez `react-number-format` poprzez prop `onValueChange`
  const handleNumericValueChange = (valuesFromNumberFormat) => {
    // valuesFromNumberFormat to obiekt od react-number-format: { floatValue, value, formattedValue }

    if (onChange) {
      // Przygotowujemy obiekt zdarzenia, który ma naśladować standardowe e.target.value
      // Musimy upewnić się, że to co trafia do value jest liczbą lub pustym stringiem
      const valueToPass =
        valuesFromNumberFormat.floatValue !== undefined &&
        valuesFromNumberFormat.floatValue !== null
          ? valuesFromNumberFormat.floatValue
          : valuesFromNumberFormat.value === ""
          ? ""
          : null; // Jeśli użytkownik usunął wszystko, przekazujemy pusty string

      // Wywołujemy oryginalne onChange z komponentu rodzica, przekazując "syntetyczne" zdarzenie
      onChange({
        target: {
          name: name, // Przekazujemy name, jeśli handler rodzica go potrzebuje
          value: valueToPass,
        },
      });
    }
  };

  return (
    <div className="numericField">
      {numeric ? (
        <NumericFormat
          customInput={TextField}
          value={value}
          // Tutaj przekazujemy naszą funkcję pośredniczącą do `onValueChange`
          onValueChange={handleNumericValueChange}
          label={label}
          placeholder={placeholder}
          name={name}
          renderText={renderText}
          className={className}
          helperText={helperText}
          error={error}
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
          onChange={onChange} // Dla PatternFormat nadal używamy oryginalnego onChange
          label={label}
          placeholder={placeholder}
          name={name}
          renderText={renderText}
          className={className}
          helperText={helperText}
          error={error}
          fullWidth
        />
      )}
    </div>
  );
}

export default NumericField;

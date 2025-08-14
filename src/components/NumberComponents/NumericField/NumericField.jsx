import { forwardRef } from "react";
import { PatternFormat, NumericFormat } from "react-number-format";
import { TextField } from "@mui/material";

// Ważne: używamy forwardRef, aby komponenty mogły poprawnie
// przekazywać refy do bazowego elementu input
const NumericField = forwardRef((props, ref) => {
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
    error,
    ...rest // Używamy rest operatora, aby zebrać wszystkie inne propsy
  } = props;

  const handleNumericValueChange = (valuesFromNumberFormat) => {
    if (onChange) {
      const valueToPass =
        valuesFromNumberFormat.floatValue !== undefined &&
        valuesFromNumberFormat.floatValue !== null
          ? valuesFromNumberFormat.floatValue
          : valuesFromNumberFormat.value === ""
          ? ""
          : null;

      onChange({
        target: {
          name: name,
          value: valueToPass,
        },
      });
    }
  };

  if (numeric) {
    return (
      <NumericFormat
        customInput={TextField}
        value={value}
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
        {...rest}
      />
    );
  }

  return (
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
      error={error}
      fullWidth
      // Przekazujemy wszystkie pozostałe propsy
      {...rest}
    />
  );
});

export default NumericField;

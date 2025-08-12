import { TextField } from "@mui/material";

const CorrectionItemForm = ({ item, handleItemChange, index }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleItemChange(index, name, value);
  };

  const renderTextField = (
    name,
    label,
    value,
    type = "number",
    disabled = false
  ) => {
    let stepValue = "0.01";
    if (name === "correctedQuantity" || name === "originalQuantity") {
      stepValue = "1";
    }

    return (
      <TextField
        key={name}
        label={label}
        name={name}
        value={value}
        onChange={handleInputChange}
        type={type}
        InputProps={{
          step: stepValue,
        }}
        disabled={disabled}
        fullWidth
        margin="normal"
        size="small"
      />
    );
  };

  return (
    <div className="correction-item-form">
      {renderTextField(
        "title",
        "Nazwa pozycji",
        item.title,
        "text",
        item.type === "MODIFICATION"
      )}
      {renderTextField("correctedQuantity", "Ilość", item.correctedQuantity)}
      {renderTextField(
        "correctedPrice",
        "Cena jednostkowa",
        item.correctedPrice
      )}
      {/* {renderTextField("correctedVat", "VAT (%)", item.correctedVat)} */}
    </div>
  );
};

export default CorrectionItemForm;

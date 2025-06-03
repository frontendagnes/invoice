// src/components/CorrectionItemRow/CorrectionItemRow.jsx
import React from "react";
import { TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function CorrectionItemRow({ item, index, handleItemChange, onRemoveItem }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleItemChange(index, name, value);
  };

  const handleRemoveClick = () => {
    onRemoveItem(index);
  };

  const originalQuantity = Number(item?.originalQuantity ?? 0);
  const originalPrice = Number(item?.originalPrice ?? 0);
  const originalWorth = Number(item?.originalWorth ?? 0);
  const originalVat = Number(item?.originalVat ?? 0);

  const currentQuantity = Number(item?.correctedQuantity ?? originalQuantity);
  const currentPrice = Number(item?.correctedPrice ?? originalPrice);
  const currentTitle = item?.title ?? "";
  const currentVat = Number(item?.correctedVat ?? originalVat);

  const correctedWorth = Number(item?.correctedWorth ?? 0);
  const worthDifference = Number(item?.worthDifference ?? 0);
  const type = item?.type;

  // Funkcja pomocnicza do renderowania pól tekstowych
  const renderTextField = (
    name,
    label,
    value,
    type = "number",
    disabled = false
  ) => {
    // Określ wartość 'step' w zależności od nazwy pola
    let stepValue = "0.01"; // Domyślny krok dla wartości pieniężnych/VAT
    if (name === "correctedQuantity" || name === "originalQuantity") {
      stepValue = "1"; // Krok 1 dla ilości
    }

    return (
      <TextField
        label={label}
        name={name}
        value={value}
        onChange={handleInputChange}
        type={type}
        // Przekazujemy 'step' bezpośrednio do TextField.
        // TextField wewnętrznie przekaże go do InputProps, co jest akceptowalne.
        step={stepValue} // <-- TUTAJ ZMIANA: PRZEKAZUJEMY BEZPOŚREDNIO JAKO PROP TextField
        disabled={disabled}
        fullWidth
        margin="normal"
        size="small"
      />
    );
  };

  return (
    <div
      className="correction-item-row"
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        margin: "10px 0",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      <IconButton
        aria-label="Usuń pozycję"
        onClick={handleRemoveClick}
        style={{ position: "absolute", top: "5px", right: "5px", color: "red" }}
      >
        <DeleteIcon />
      </IconButton>

      <h4>Pozycja Korekty: {currentTitle}</h4>
      <p>
        Typ:{" "}
        {type === "MODIFICATION"
          ? "Modyfikacja"
          : type === "ADDITION"
          ? "Dodanie"
          : "Usunięcie"}
      </p>

      {type === "MODIFICATION" && (
        <div
          style={{
            marginBottom: "10px",
            padding: "5px",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
          }}
        >
          <h5>Wartości oryginalne:</h5>
          <p>Ilość: {originalQuantity}</p>
          <p>Cena jednostkowa: {originalPrice.toFixed(2)} zł</p>
          <p>Wartość całkowita: {originalWorth.toFixed(2)} zł</p>
          <p>VAT: {originalVat}%</p>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "10px",
        }}
      >
        {renderTextField(
          "title",
          "Tytuł",
          currentTitle,
          "text",
          type === "MODIFICATION"
        )}
        {renderTextField("correctedQuantity", "Ilość", currentQuantity)}
        {renderTextField("correctedPrice", "Cena jednostkowa", currentPrice)}
        {renderTextField("correctedVat", "VAT (%)", currentVat)}
      </div>

      <div
        style={{
          marginTop: "15px",
          paddingTop: "10px",
          borderTop: "1px dashed #eee",
        }}
      >
        <p>
          Wartość skorygowana dla pozycji: **{correctedWorth.toFixed(2)} zł**
        </p>
        {type === "MODIFICATION" && worthDifference !== 0 && (
          <p style={{ color: worthDifference < 0 ? "red" : "green" }}>
            Różnica wartości: {worthDifference.toFixed(2)} zł
          </p>
        )}
      </div>
    </div>
  );
}

export default CorrectionItemRow;

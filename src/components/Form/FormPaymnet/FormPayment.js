import React from "react";
import "./FormPayment.css";
import NativeSelect from "@mui/material/NativeSelect";
function FormPayment({ selected, setSelected }) {
  return (
    <div className="formpayment">
      <div className="createinvoice__text">Forma płatności:</div>
      <div className="formpayment__selected">
      <NativeSelect
        name="method-shipping"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        fullWidth
      >
        <option value="przelew">przelew</option>
        <option value="pobranie">pobranie</option>
      </NativeSelect>
      </div>
    </div>
  );
}

export default FormPayment;

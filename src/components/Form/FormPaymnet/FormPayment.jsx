import React from "react";
import "./FormPayment.css";
import NativeSelect from "@mui/material/NativeSelect";
function FormPayment({ selected, dispatch }) {
  const handleChange = (e) => {
    dispatch({ type: "SET_SELECTED", selected: e.target.value });
  };

  return (
    <div className="formpayment">
      <div className="createinvoice__text">Forma płatności:</div>
      <div className="formpayment__selected">
        <NativeSelect
          name="method-shipping"
          value={selected}
          onChange={handleChange}
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

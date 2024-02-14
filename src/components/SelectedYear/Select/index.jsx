import React, { useState } from "react";
import { useStateValue } from "../../../assets/utility/StateProvider";
//mui
import NativeSelect from "@mui/material/NativeSelect";

import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
function Select() {
  const [{ yearArray }, dispatch] = useStateValue();
  const [selected, setSelected] = useState("");
  const changeYear = () => {
    dispatch({ type: "SELECTED_YEAR", item: parseInt(selected) });
  };
  return (
    <div>
      <NativeSelect
        name="selected-year"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        fullWidth
      >
        <option defaultValue={new Date().getFullYear()}>
          {new Date().getFullYear()}
        </option>
        {yearArray.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </NativeSelect>
      <ChangeCircleIcon
        fontSize="large"
        color="success"
        titleAccess="Wypierz"
        sx={{ cursor: "pointer" }}
        onClick={changeYear}
      />
    </div>
  );
}

export default Select;

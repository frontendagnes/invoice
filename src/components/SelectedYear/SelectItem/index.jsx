import React, { useState, useEffect } from "react";
import { useStateValue } from "../../../assets/utility/StateProvider";
//mui
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

function SelectItem({ year, deleteItem }) {
  const [value, setValue] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const [{ selectedYear }, dispatch] = useStateValue();
  useEffect(() => {
    setValue(year);
  }, [value]);

  const changeYear = () => {
    dispatch({ type: "SELECTED_YEAR", item: parseInt(value) });
    setIsClicked(true);

    setTimeout(() => setIsClicked(false), 300);
  };
  return (
    <li className="selectedYear__item">
      <div
        style={{ color: isClicked ? "#ff0000" : "#000000" }}
        value={value}
        onClick={changeYear}
      >
        {year}
      </div>
      {/* <RemoveCircleIcon onClick={deleteItem} color="error" titleAccess="Usuń" /> */}
    </li>
  );
}

export default SelectItem;

import React, { useState } from "react";
import { useStateValue } from "../../../assets/utility/StateProvider";
//mui
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
//components
import Tooltip from "../../Tooltip/Tooltip";

function SelectItem({ year, deleteItem }) {
  const [isClicked, setIsClicked] = useState(false);
  const [{ selectedYear }, dispatch] = useStateValue();

  const changeYear = () => {
    dispatch({ type: "SELECTED_YEAR", item: parseInt(year) });
    setIsClicked(true);

    const timer = setTimeout(() => {
      setIsClicked(false);
    }, 500); // 500 ms = 0.5 second
    return () => clearTimeout(timer); // Cleanup the timer on unmount
  };

  function getClassName(isClicked, selectedYear, year) {
    if (isClicked) {
      return "selectItem__year--clicked";
    } else if (selectedYear === year) {
      return "selectItem__year--active";
    } else {
      return "selectItem__year--default";
    }
  }
  const className = getClassName(isClicked, selectedYear, year);
  return (
    <li className="selectedYear__item">
      <div className={className} onClick={changeYear}>
        {year}
      </div>
      <Tooltip text="Usuń rok" fontSize="10px" left="50px">
        <RemoveCircleIcon
          onClick={deleteItem}
          color="error"
          titleAccess="Usuń"
        />
      </Tooltip>
    </li>
  );
}

export default SelectItem;

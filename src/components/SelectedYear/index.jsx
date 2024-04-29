import React from "react";
import "./SelectedYear.css";
import { useStateValue } from "../../assets/utility/StateProvider";

//components
import Select from "./Select";
import AddYear from "./AddYear";

function SelectedYear() {
  const [{ yearArray }, dispatch] = useStateValue();
  return (
    <>
      <div className="selectedYear">
        {/* {yearArray.map((item) => {
          item === 2023 ? <AddYear /> : null;
        })} */}
        <AddYear />
        <Select />
      </div>
    </>
  );
}

export default SelectedYear;

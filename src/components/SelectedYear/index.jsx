import React, { useEffect, useState } from "react";
import "./SelectedYear.css";
import { useStateValue } from "../../assets/utility/StateProvider";

//components
import Select from "./Select";
import AddYear from "./AddYear";

function SelectedYear() {
  const [{ yearArray }, dispatch] = useStateValue();
  const [years, setYears] = useState([]);

  // const isYear = () => {
  //   setYears([]);
  //   yearArray.map((item) =>
  //     item.data.year === new Date().getFullYear()
  //       ? setYears([item.data.year])
  //       : null
  //   );
  // };

  // useEffect(() => {
  //   isYear();
  //   console.log(">>", years);
  // }, []);
  return (
    <>
      <div className="selectedYear">
        {/* {yearArray.map((item) => (
          !(item.data.year === new Date().getFullYear()) ? <AddYear /> : null
        ))} */}
        {/* <AddYear /> */}
        {/* {years.length === 0 ? <AddYear /> : null} */}
        <Select />
      </div>
    </>
  );
}

export default SelectedYear;

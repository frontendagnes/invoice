import "./ViewSelectedYers.css";
import { useStateValue } from "../../../state/StateProvider";

//mui
import NativeSelect from "@mui/material/NativeSelect";

function ViewSelectedYear() {
  const [{ selectedYear, yearArray }, dispatch] = useStateValue();
  const handleChange = (e) => {
    dispatch({ type: "SELECTED_YEAR", item: Number(e.target.value) });
  };
  return (
    <div className="viewSelectedYear">
      <NativeSelect
        name="years"
        id="years"
        onChange={handleChange}
        sx={{
          width: "100px",
        }}
        value={selectedYear}
      >
        {yearArray
          .sort((a, b) => b.data.year - a.data.year)
          .map((item) => (
            <option key={item.id} value={item.data.year}>
              {item.data.year}
            </option>
          ))}
      </NativeSelect>
    </div>
  );
}

export default ViewSelectedYear;

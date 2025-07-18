import "./SelectMonth.css";
import { months } from "../months";
//mui
import { NativeSelect } from "@mui/material";

function SelectMonth({ selectedMonthNumber, onMonthChange }) {
  const handleChange = (e) => {
    const newMonthNumber = parseInt(e.target.value, 10);
    onMonthChange(newMonthNumber);
  };

  return (
    <NativeSelect
      name="months"
      value={selectedMonthNumber || ""}
      onChange={handleChange}
    >
      <option value="">Wybierz miesiąc</option>
      {months.map((month, index) => (
        <option key={month} value={index + 1}>
          {month}
        </option>
      ))}
    </NativeSelect>
  );
}

export default SelectMonth;

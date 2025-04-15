import { useState, useCallback, useMemo } from "react";
import { today } from "../../assets/functions";

const useDateFilter = (data, selectedYear) => {
  const [filterDate, setFilterDate] = useState(today());

  const resetDate = useCallback(() => {
    setFilterDate(today());
  }, []);

  const filteredDataByDateAndYear = useMemo(() => {
    return data
      .filter((item) => new Date(item.data.date).getFullYear() === selectedYear)
      .filter((item) => item.data.date === filterDate);
  }, [data, filterDate, selectedYear]);

  return { filterDate, setFilterDate, resetDate, filteredDataByDateAndYear };
};

export default useDateFilter;

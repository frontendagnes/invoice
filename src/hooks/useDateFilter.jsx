import { useState, useCallback, useMemo } from "react";
import { today } from "../utility/functions.jsx";
import { getDateFromItem } from "../utility/documentFiltres"; // <-- WAŻNE: Zaimportuj getDateFromItem

const useDateFilter = (data, selectedYear) => {
  const [filterDate, setFilterDate] = useState("");

  const resetDate = useCallback(() => {
    setFilterDate("");
  }, []);

  const filteredDataByDateAndYear = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return [];
    }

    return data
      .filter((item) => {
        const docDate = getDateFromItem(item);
        return (
          !isNaN(docDate.getTime()) && docDate.getFullYear() === selectedYear
        );
      })
      .filter((item) => {
        const docDate = getDateFromItem(item);

        const itemDateString = !isNaN(docDate.getTime())
          ? docDate.toISOString().slice(0, 10)
          : null;

        return !filterDate || itemDateString === filterDate;
      });
  }, [data, filterDate, selectedYear]);

  return { filterDate, setFilterDate, resetDate, filteredDataByDateAndYear };
};

export default useDateFilter;

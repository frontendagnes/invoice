import { useState, useCallback, useMemo } from "react";
import { today } from "../assets/functions.jsx";
import { getDateFromItem } from "../assets/utility/documentFiltres"; // <-- WAŻNE: Zaimportuj getDateFromItem

const useDateFilter = (data, selectedYear) => {
  const [filterDate, setFilterDate] = useState(today());

  const resetDate = useCallback(() => {
    setFilterDate(today());
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

        return itemDateString === filterDate;
      });
  }, [data, filterDate, selectedYear]);

  return { filterDate, setFilterDate, resetDate, filteredDataByDateAndYear };
};

export default useDateFilter;

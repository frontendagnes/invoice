import { useState, useMemo } from "react";

const useSearchFilter = (data, selectedYear) => {
  const [searchText, setSearchText] = useState("");

  const filteredDataBySearchAndYear = useMemo(() => {
    return data
      .filter((item) => new Date(item.data.date).getFullYear() === selectedYear)
      .filter(
        (item) =>
          item.data.buyer.name
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          item.data.number.toLowerCase().includes(searchText.toLowerCase())
      )
      .sort(
        (a, b) =>
          new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
      );
  }, [data, searchText, selectedYear]);

  return { searchText, setSearchText, filteredDataBySearchAndYear };
};

export default useSearchFilter;

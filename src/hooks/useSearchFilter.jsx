import { useState, useMemo } from "react";
// Funkcja do bezpiecznego dostępu do zagnieżdżonej właściwości
const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, key) => acc && acc[key], obj);
};

const useSearchFilter = (data, selectedYear, field) => {
  const [searchText, setSearchText] = useState("");

  const filteredDataBySearchAndYear = useMemo(() => {
    return data
      .filter((item) => new Date(item.data.date).getFullYear() === selectedYear)
      .filter((item) => {
        const fieldValue = getNestedValue(item.data, field);
        const fieldMatches =
          typeof fieldValue === "string" &&
          fieldValue.toLowerCase().includes(searchText.toLowerCase());

        const numberMatches = item.data?.number
          ?.toLowerCase()
          .includes(searchText.toLowerCase());

        const nipMatches = item.data?.nip
          ?.toLowerCase()
          .includes(searchText.toLowerCase());

        return fieldMatches || numberMatches || nipMatches;
      })
      .sort(
        (a, b) =>
          new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
      );
  }, [data, searchText, selectedYear]);

  return { searchText, setSearchText, filteredDataBySearchAndYear };
};

export default useSearchFilter;

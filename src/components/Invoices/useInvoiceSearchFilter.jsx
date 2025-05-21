import { useState, useMemo } from "react";

// Funkcja do bezpiecznego dostępu do zagnieżdżonej właściwości
const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, key) => acc && acc[key], obj);
};

const useInvoiceSearchFilter = (data, selectedYear) => {
  const [searchText, setSearchText] = useState("");

  const filteredDataBySearchAndYear = useMemo(() => {
    if (!data) {
      return [];
    }

    const lowerSearchText = searchText.toLowerCase();

    return data
      .filter((item) => new Date(item.data.date).getFullYear() === selectedYear)
      .filter((item) => {
        const buyerName =
          getNestedValue(item.data, "buyer.name")?.toLowerCase() || "";
        const buyerNip =
          getNestedValue(item.data, "buyer.nip")?.toLowerCase() || "";
        const buyerTown =
          getNestedValue(item.data, "buyer.town")?.toLowerCase() || "";
        const invoiceNumber = item.data?.number?.toLowerCase() || "";

        return (
          buyerName.includes(lowerSearchText) ||
          buyerNip.includes(lowerSearchText) ||
          buyerTown.includes(lowerSearchText) ||
          invoiceNumber.includes(lowerSearchText)
        );
      })
      .sort(
        (a, b) =>
          new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
      );
  }, [data, searchText, selectedYear]);

  return { searchText, setSearchText, filteredDataBySearchAndYear };
};

export default useInvoiceSearchFilter;

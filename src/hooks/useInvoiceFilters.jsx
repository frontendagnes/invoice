import { useState, useMemo } from "react";
import usePagination from "./usePagination";

// konwersja string -> YYYY-MM-DD
const normalizeDate = (dateString) => {
  if (!dateString) return null;
  return dateString.slice(0, 10);
};

const useInvoiceFilterSystem = (data, selectedYear) => {
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // ——————— 1. Normalizacja + przygotowanie pól
  const normalized = useMemo(() => {
    return data.map((item) => {
      const d = item?.data?.date || null;
      const normalizedDate = normalizeDate(d);
      const year = normalizedDate ? Number(normalizedDate.slice(0, 4)) : null;

      return {
        ...item,
        _date: normalizedDate,
        _year: year,
        _number: item.data?.number?.toLowerCase() || "",
        _buyerName: item.data?.buyer?.name?.toLowerCase() || "",
        _buyerNip: item.data?.buyer?.nip?.toLowerCase() || "",
        _buyerTown: item.data?.buyer?.town?.toLowerCase() || "",
        _note: item.data?.note?.toLowerCase() || "",
      };
    });
  }, [data]);

  // ——————— 2. Filtr roku
  const filteredByYear = useMemo(() => {
    if (!selectedYear) return normalized;
    return normalized.filter((i) => i._year === selectedYear);
  }, [normalized, selectedYear]);

  // ——————— 3. Filtr daty
  const filteredByDate = useMemo(() => {
    if (!filterDate) return filteredByYear;
    return filteredByYear.filter((i) => i._date === filterDate);
  }, [filteredByYear, filterDate]);

  // ——————— 4. Filtr wyszukiwarki
  const filteredFinal = useMemo(() => {
    const s = search.toLowerCase();

    let result = filteredByDate;

    // ——— 1. Filtr wyszukiwania
    if (s) {
      result = result.filter((i) => {
        return (
          i._number.includes(s) ||
          i._buyerName.includes(s) ||
          i._buyerNip.includes(s) ||
          i._buyerTown.includes(s) ||
          i._note.includes(s)
        );
      });
    }

    // ——— 2. SORTOWANIE (najnowsze na górze)
    result = [...result].sort((a, b) => {
      const da = new Date(a._date).getTime();
      const db = new Date(b._date).getTime();

      return db - da; // DESC
    });

    return result;
  }, [filteredByDate, search]);

  // ——————— 5. Paginacja
  const pagination = usePagination(filteredFinal, 10);

  return {
    search,
    setSearch,
    filterDate,
    setFilterDate,
    resetDate: () => setFilterDate(""),
    filteredFinal,
    ...pagination,
  };
};

export default useInvoiceFilterSystem;

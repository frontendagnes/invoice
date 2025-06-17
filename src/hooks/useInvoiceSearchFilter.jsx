// src/hooks/useInvoiceSearchFilter.js
import { useState, useMemo } from "react";

import { getDateFromItem } from "../utility/documentFiltres";

const useInvoiceSearchFilter = (dataToFilter, selectedYear) => {
  const [searchText, setSearchText] = useState("");

  const filteredDataBySearchAndYear = useMemo(() => {
    const searchTerm = searchText.toLowerCase();

    if (!dataToFilter || dataToFilter.length === 0) {
      console.log("No dataToFilter provided or it's empty.");
      return [];
    }

    const searchFiltered = dataToFilter.filter((item) => {
      // WAŻNE: Sprawdź item.data.documentType dla KAŻDEGO itemu
      const documentType = item.data?.documentType || "INVOICE";
      let matches = false;

      if (!searchTerm) {
        matches = true; // Jeśli brak tekstu wyszukiwania, wszystko pasuje
      } else if (documentType === "CORRECTION") {
        const correctionNumberMatch = item.data.correctionNumber
          ?.toLowerCase()
          .includes(searchTerm);
        const originalInvoiceNumberMatch = item.data.originalInvoiceData?.number
          ?.toLowerCase()
          .includes(searchTerm);
        const correctedBuyerNameMatch =
          item.data.correctedHeader?.correctedBuyer?.name
            ?.toLowerCase()
            .includes(searchTerm);
        const originalBuyerNameMatch =
          item.data.originalInvoiceData?.buyer?.name
            ?.toLowerCase()
            .includes(searchTerm);
        const correctedBuyerNipMatch =
          item.data.correctedHeader?.correctedBuyer?.nip
            ?.toLowerCase()
            .includes(searchTerm);
        const originalBuyerNipMatch = item.data.originalInvoiceData?.buyer?.nip
          ?.toLowerCase()
          .includes(searchTerm);
        const correctionNoteMatch = item.data.note
          ?.toLowerCase()
          .includes(searchTerm); // Dodatkowe wyszukiwanie po notatce

        matches =
          correctionNumberMatch ||
          originalInvoiceNumberMatch ||
          correctedBuyerNameMatch ||
          originalBuyerNameMatch ||
          correctedBuyerNipMatch ||
          originalBuyerNipMatch ||
          correctionNoteMatch; // Dodano wyszukiwanie po notatce
      } else {
        // documentType === "INVOICE"
        const invoiceNumberMatch = item.data.number
          ?.toLowerCase()
          .includes(searchTerm);
        const buyerNameMatch = item.data.buyer?.name
          ?.toLowerCase()
          .includes(searchTerm);
        const buyerNipMatch = item.data.buyer?.nip
          ?.toLowerCase()
          .includes(searchTerm);
        const buyerTownMatch = item.data.buyer?.town
          ?.toLowerCase()
          .includes(searchTerm);
        const invoiceNoteMatch = item.data.note
          ?.toLowerCase()
          .includes(searchTerm); // Dodatkowe wyszukiwanie po notatce

        matches =
          invoiceNumberMatch ||
          buyerNameMatch ||
          buyerNipMatch ||
          buyerTownMatch ||
          invoiceNoteMatch; // Dodano wyszukiwanie po notatce
      }
      return matches;
    });

    const sortedData = searchFiltered.sort((a, b) => {
      const dateA = getDateFromItem(a);
      const dateB = getDateFromItem(b);

      const timeA = dateA.getTime();
      const timeB = dateB.getTime();

      if (isNaN(timeA) && isNaN(timeB)) return 0;
      if (isNaN(timeA)) return 1;
      if (isNaN(timeB)) return -1;

      return timeB - timeA;
    });

    return sortedData;
  }, [dataToFilter, searchText, selectedYear]);

  return {
    searchText,
    setSearchText,
    filteredDataBySearchAndYear, // To są wszystkie przefiltrowane i posortowane dane
  };
};

export default useInvoiceSearchFilter;
// src/assets/utility/documentFiltres.js

/**
 * Bezpiecznie pobiera obiekt Date z dokumentu (faktury lub korekty).
 * Zwraca obiekt Date (może być "Invalid Date" jeśli data jest brakująca/niepoprawna).
 *
 * @param {object} item - Obiekt dokumentu { id, data: { ... } }.
 * @returns {Date} Obiekt Date (może być "Invalid Date" jeśli data jest brakująca/niepoprawna).
 */
export const getDateFromItem = (item) => {
  const documentType = item.data?.documentType || "INVOICE";

  const rawDate =
    documentType === "CORRECTION" ? item.data?.createdAt : item.data?.date;

  const parsed = new Date(rawDate);

  if (isNaN(parsed.getTime())) return new Date(NaN);

  parsed.setHours(12, 0, 0, 0);

  return parsed;
};
/**
 * Filtruje i sortuje tablicę dokumentów na podstawie roku i miesiąca.
 *
 * @param {Array<object>} documents - Tablica dokumentów ({ id, data: { ... } }).
 * @param {number} selectedYear - Rok do filtrowania.
 * @param {number | null} selectedMonth - Miesiąc do filtrowania (1-12). null, jeśli nie filtrujemy po miesiącu.
 * @returns {Array<object>} Przefiltrowana i posortowana tablica dokumentów.
 */
export const getFilteredAndSortedDocuments = (
  documents,
  selectedYear,
  selectedMonth = null
) => {
  return documents
    .filter((item) => {
      const docDate = getDateFromItem(item);
      // Sprawdzamy, czy data jest prawidłowa i czy rok się zgadza
      return (
        !isNaN(docDate.getTime()) && docDate.getFullYear() === selectedYear
      );
    })
    .sort((a, b) => {
      const dateA = getDateFromItem(a);
      const dateB = getDateFromItem(b);

      const timeA = dateA.getTime();
      const timeB = dateB.getTime();

      // Umieść dokumenty z nieprawidłową datą na końcu listy
      if (isNaN(timeA) && isNaN(timeB)) return 0;
      if (isNaN(timeA)) return 1; // a jest NaN, b nie jest - a idzie na koniec
      if (isNaN(timeB)) return -1; // b jest NaN, a nie jest - b idzie na koniec

      return timeA - timeB; // Sortuj rosnąco według daty
    })
    .filter((item) => {
      if (selectedMonth === null) {
        return true; // Nie filtruj po miesiącu, jeśli selectedMonth jest null
      }

      const docDate = getDateFromItem(item);
      // Sprawdzamy, czy data jest prawidłowa i czy miesiąc się zgadza
      // Pamiętaj: getMonth() zwraca indeks miesiąca (0-11), więc dodajemy 1
      return (
        !isNaN(docDate.getTime()) && docDate.getMonth() + 1 === selectedMonth
      );
    });
};

/**
 * Przygotowuje dane do wyświetlenia w tabeli, uwzględniając typ dokumentu (faktura/korekta).
 *
 * @param {object} item - Obiekt dokumentu { id, data: { ... } }.
 * @param {function} getTotal - Funkcja getTotal z assets/functions (do obliczania wartości dla faktur).
 * @returns {object} Obiekt zawierający sformatowane dane do wyświetlenia.
 */
export const getDisplayDataForTable = (item, getTotal) => {
  const documentType = item.data?.documentType || "INVOICE";
  let displayData = {};

  if (documentType === "CORRECTION") {
    // Oblicz sumę worthDifference ze wszystkich skorygowanych pozycji
    const totalWorthDifference = item.data.correctedItems.reduce(
      (sum, currentItem) => {
        return sum + (currentItem.worthDifference || 0);
      },
      0
    );

    displayData = {
      number: item.data.originalInvoiceData?.number || "Brak nr oryginału",
      date: item.data.createdAt
        ? new Date(item.data.createdAt).toLocaleDateString("pl-PL")
        : "Brak daty korekty",
      worth: totalWorthDifference, // Używamy sumy worthDifference
      isCorrection: true,
      correctionNumber: item.data.correctionNumber || "Brak nr korekty",
      contractor:
        item.data.originalInvoiceData?.buyer?.name || "Brak kontrahenta",
    };
  } else {
    displayData = {
      number: item.data.number || "Brak numeru",
      date: item.data.date
        ? new Date(item.data.date).toLocaleDateString("pl-PL")
        : "Brak daty",
      worth: item.data.products ? getTotal(item.data.products) : 0,
      contractor: item.data.buyer.name || "Brak kontrahenta",
      isCorrection: false,
    };
  }
  return displayData;
};

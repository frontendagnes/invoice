import { nanoid } from "nanoid";
import { CircularProgress } from "@mui/material";

/**
 * Plik ten zawiera zbiór funkcji pomocniczych (utility functions),
 * które ułatwiają wykonywanie często powtarzających się zadań w aplikacji.
 * Dzięki nim kod staje się bardziej czytelny, łatwiejszy w utrzymaniu
 * i pozwala uniknąć powtarzania tej samej logiki w wielu miejscach.
 */

/**
 * Zwraca aktualną datę w formacie YYYY-MM-DD.
 * @returns {string} Aktualna data w formacie "rrrr-mm-dd".
 */
export const today = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  const currentDay = () => {
    if (day < 10) {
      return `0${day}`;
    } else return day;
  };
  const currentMonth = () => {
    if (month < 10) {
      return `0${month}`;
    } else return month;
  };

  let fulldate = `${year}-${currentMonth()}-${currentDay()}`;
  return fulldate;
};

/**
 * Sumuje wartości z pola 'worth' w tablicy obiektów.
 * @param {Array<Object>} data Tablica obiektów, z których każdy ma pole 'worth'.
 * @returns {number} Całkowita suma wartości.
 */
export const getTotal = (data) =>
  data?.reduce((amount, item) => item.worth + amount, 0);

/**
 * Sumuje wszystkie liczby w podanej tablicy.
 * @param {Array<number>} data Tablica liczb.
 * @returns {number} Całkowita suma liczb.
 */
export const getSum = (data) =>
  data?.reduce((amount, item) => item + amount, 0);

/**
 * Generuje unikalny identyfikator w formacie 'item-losoweZnaki'.
 * @returns {string} Unikalny identyfikator.
 */
export const index = () => {
  return `item-${nanoid(8)}`;
};

/**
 * Zwraca gotowy komponent React, który wyświetla animację ładowania.
 * @returns {JSX.Element} Komponent ładowania.
 */
export const renderLoader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      padding: "20px",
      alignItems: "center",
    }}
  >
    <CircularProgress color="success" />
    <span
      style={{
        marginLeft: "10px",
        letterSpacing: "3px",
      }}
    >
      Loading...
    </span>
  </div>
);

/**
 * Sprawdza, czy numer NIP już istnieje na liście kontrahentów.
 * @param {string} nip Numer NIP do sprawdzenia.
 * @param {Array<Object>} contractorsList Tablica obiektów kontrahentów.
 * @returns {boolean} 'true' jeśli duplikat istnieje, 'false' w przeciwnym razie.
 */
export const checkNipDuplicate = (nip, contractorsList) => {
  if (!nip) return false;
  return contractorsList.some((item) => String(item.data.nip) === String(nip));
};

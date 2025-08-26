/**
 * @fileoverview Custom hook zarządzający logiką komponentu Contractors, w tym pobieraniem,
 * sortowaniem, filtrowaniem, paginacją oraz operacjami CRUD na kontrahentach.
 * Wykorzystuje kontekst stanu globalnego, custom hook do interakcji z Firestore
 * oraz custom hook do obsługi paginacji.
 */

import { useState, useEffect, useMemo } from "react";
import { useStateValue } from "../../state/StateProvider";
import useFirestore from "../../api/useFirestore/useFirestore";
import usePagination from "../../hooks/usePagination";
import { validateContractor } from "./validate";
import { checkNipDuplicate } from "../../utility/functions";
/**
 * Liczba elementów wyświetlanych na jednej stronie paginacji.
 * @constant {number}
 */
const ITEMS_PER_PAGE = 5;

/**
 * Funkcja sortująca listę kontrahentów alfabetycznie według nazwy.
 * @param {Array<Object>} contractors - Lista kontrahentów do posortowania.
 * @returns {Array<Object>} - Nowa posortowana lista kontrahentów.
 */
const sortContractorsAlphabetically = (contractors) => {
  return [...contractors].sort((a, b) => {
    const nameA = a.data.contractor.toLowerCase();
    const nameB = b.data.contractor.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
};

/**
 * Custom hook zarządzający stanem i logiką komponentu Contractors.
 * Zawiera funkcje do pobierania, filtrowania, sortowania, paginacji
 * oraz operacji CRUD na kontrahentach.
 * @returns {Object} - Obiekt zawierający stan i funkcje do zarządzania kontrahentami.
 */

export function useContractorsManagement() {
  /**
   * Stan globalny aplikacji zawierający listę kontrahentów i informacje o użytkowniku.
   * @type {Object}
   * @property {Array<Object>} contractors - Lista wszystkich kontrahentów.
   * @property {Object} user - Informacje o aktualnie zalogowanym użytkowniku.
   */
  const [{ contractors, user }, dispatch] = useStateValue();

  /**
   * Custom hook do interakcji z bazą danych Firestore.
   * @type {Object}
   * @property {Function} getData - Funkcja do pobierania danych z kolekcji.
   * @property {Function} addDocument - Funkcja do dodawania dokumentów do kolekcji.
   * @property {Function} deleteDocument - Funkcja do usuwania dokumentów z kolekcji.
   * @property {string|null} errorFirestore - Ewentualny błąd podczas interakcji z Firestore.
   */
  const { getData, addDocument, deleteDocument, errorFirestore } =
    useFirestore("invoices");

  /**
   * Stan lokalny hooka zarządzający widocznością modalu potwierdzenia usunięcia.
   * @type {boolean}
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Stan lokalny hooka przechowujący ID kontrahenta do usunięcia.
   * @type {string|null}
   */
  const [itemToDeleteId, setItemToDeleteId] = useState(null);

  /**
   * Stan lokalny hooka przechowujący nazwę kontrahenta do usunięcia (do wyświetlenia w modalu).
   * @type {string|null}
   */
  const [itemToDeleteName, setItemToDeleteName] = useState(null);

  /** stan lokalny hooka przechowujący błędy walidacji
   * @type {object}
  */
  const [errors, setErrors] = useState({});

  /**
   * Stan lokalny hooka przechowujący wartość testu antyspamowego.
   * @type {string}
   */
  const [test, setTest] = useState("");
  /**
   * Stan lokalny hooka przechowujący frazę wyszukiwania kontrahentów.
   * @type {string}
   */
  const [searchContractors, setSearchContractors] = useState("");

  /**
   * Stan lokalny hooka przechowujący dane formularza dodawania/edycji kontrahenta.
   * @type {Object}
   * @property {string} contractor - Nazwa kontrahenta w formularzu.
   * @property {string} nip - Numer NIP kontrahenta w formularzu.
   */
  const [state, setState] = useState({
    contractor: "",
    nip: "",
    street: "",
    zipCode: "",
    town: "",
  });

  /**
   * Efekt pobierający dane kontrahentów z Firestore po zamontowaniu komponentu
   * lub zmianie zalogowanego użytkownika.
   */
  useEffect(() => {
    if (!user) return;
    getData("contractors", "SET_CONTRACTORS");
  }, [user, dispatch]);

  /**
   * Memoizowana lista posortowanych alfabetycznie kontrahentów.
   * Aktualizuje się, gdy zmieni się lista wszystkich kontrahentów.
   * @type {Array<Object>}
   */
  const sortedContractors = useMemo(() => {
    return contractors ? sortContractorsAlphabetically(contractors) : [];
  }, [contractors]);

  /**
   * Memoizowana lista przefiltrowanych i posortowanych kontrahentów.
   * Filtruje listę posortowanych kontrahentów na podstawie frazy wyszukiwania (bez uwzględniania wielkości liter).
   * Aktualizuje się, gdy zmieni się lista kontrahentów lub fraza wyszukiwania.
   * @type {Array<Object>}
   */
  const filteredAndSortedContractors = useMemo(() => {
    return sortedContractors.filter((item) =>
      item.data.contractor
        .toLowerCase()
        .includes(searchContractors.toLowerCase())
    );
  }, [contractors, searchContractors]);

  /**
   * Custom hook do obsługi paginacji.
   * @type {Object}
   * @property {number} currentPage - Numer bieżącej strony.
   * @property {Array<Object>} currentPageData - Dane wyświetlane na bieżącej stronie.
   * @property {number} totalPages - Całkowita liczba stron.
   * @property {Function} handlePageChange - Funkcja do zmiany bieżącej strony.
   */
  const { currentPage, currentPageData, totalPages, handlePageChange } =
    usePagination(filteredAndSortedContractors, ITEMS_PER_PAGE);

  /**
   * Funkcja otwierająca modal potwierdzenia usunięcia kontrahenta.
   * Ustawia stan modalu na widoczny i przechowuje ID oraz nazwę kontrahenta do usunięcia.
   * @param {string} idContractor - ID kontrahenta do usunięcia.
   * @param {string} nameContractor - Nazwa kontrahenta do usunięcia.
   */
  const openConfirmModal = (idContractor, nameContractor) => {
    setIsModalOpen(true);
    setItemToDeleteId(idContractor);
    setItemToDeleteName(nameContractor);
  };

  /**
   * Funkcja zamykająca modal potwierdzenia usunięcia kontrahenta.
   * Resetuje stan modalu oraz ID i nazwę kontrahenta do usunięcia.
   */
  const closeConfirmModal = () => {
    setIsModalOpen(false);
    setItemToDeleteId(null);
    setItemToDeleteName(null);
  };

  /**
   * Funkcja obsługująca formularza dodawania nowego kontrahenta.
   * Przeprowadza walidację danych, sprawdza, czy kontrahent o podanym NIP-ie już istnieje,
   * a następnie dodaje nowego kontrahenta do bazy danych i resetuje stan formularza.
   * @async
   * @param {Object} e - Obiekt zdarzenia formularza.
   */
  const handleContractorSubmit = async (e) => {
    e.preventDefault();
    const msg = validateContractor(state.contractor, state.nip, test);
    if (msg) {
      // dispatch({ type: "ALERT__ERROR", item: msg });
      setErrors(msg)
      setTest("");
      return;
    }
    if (checkNipDuplicate(state.nip, contractors)) {
      dispatch({
        type: "ALERT__ERROR",
        item: `Kontrahent o tym NIP-ie ${state.nip} już istnieje.`,
      });
      return;
    }

    const data = {
      contractor: state.contractor,
      nip: state.nip,
      street: state?.street,
      zipCode: state?.zipCode,
      town: state?.town,
    };
    await addDocument(data, "contractors");
    dispatch({
      type: "ALERT_SUCCESS",
      item: "Kontrahent został dodany poprawnie",
    });
    setState({
      contractor: "",
      nip: "",
      street: "",
      zipCode: "",
      town: "",
    });
  };

  /**
   * Funkcja obsługująca usunięcie kontrahenta.
   * Usuwa kontrahenta z bazy danych na podstawie `itemToDeleteId` i zamyka modal potwierdzenia.
   * Wyświetla komunikat o błędzie w przypadku braku ID elementu do usunięcia.
   * @async
   */
  const handleContractorDelete = async () => {
    if (!filteredAndSortedContractors) return;
    if (!itemToDeleteId) {
      dispatch({ type: "ALERT__ERROR", item: "Brakuje elementu do usunięcia" });
      return;
    }
    await deleteDocument("contractors", itemToDeleteId);
    dispatch({ type: "ALERT_DELETE" });
    closeConfirmModal();
  };
  /**
   * Obiekt zwracany przez hook, zawierający stan i funkcje do zarządzania kontrahentami.
   */
  return {
    //state
    errorFirestore,
    errors,
    isModalOpen,
    itemToDeleteName,
    searchContractors,
    setSearchContractors,
    state,
    setState,
    filteredAndSortedContractors,
    currentPage,
    currentPageData,
    totalPages,
    test,
    setTest,
    setErrors,
    //functions
    handlePageChange,
    openConfirmModal,
    closeConfirmModal,
    handleContractorSubmit,
    handleContractorDelete,
  };
}

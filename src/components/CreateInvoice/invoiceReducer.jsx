import { today } from "../../utility/functions";

export const initialState = {
  count: 0,
  year: new Date().getFullYear(),
  order: "",
  number: "",
  date: today(),
  buyer: { name: "", street: "", zipcode: "", town: "", nip: "" },
  seller: { name: "", street: "", zipcode: "", town: "", nip: "" },
  originalSeller: { name: "", street: "", zipcode: "", town: "", nip: "" },
  selected: "przelew",
  note: "",
  error: "",
  check: false,
  title: "",
  price: null,
  quantity: 1,
  errors: {},
  errorsSeller: {},
};
// Ta funkcja jest pomocnikiem, który pozwala na usunięcie klucza z obiektu
const clearError = (errors, fieldName) => {
  const newErrors = { ...errors };
  delete newErrors[fieldName];
  return newErrors;
};
export const invoiceReducer = (state, action) => {
  switch (action.type) {
    case "SET_BUYER":
      // Zaktualizuj dane i usuń błąd, jeśli istnieje
      return {
        ...state,
        buyer: { ...state.buyer, ...action.payload },
        errors: clearError(state.errors, Object.keys(action.payload)[0]),
      };

    case "SET_SELLER":
      // Zaktualizuj dane i usuń błąd, jeśli istnieje
      return {
        ...state,
        seller: { ...state.seller, ...action.payload },
        errorsSeller: clearError(
          state.errorsSeller,
          Object.keys(action.payload)[0]
        ),
      };
    case "LOAD_SELLER_FROM_DB":
      const sellerData = action.payload;
      return {
        ...state,
        seller: { ...state.seller, ...sellerData },
        originalSeller: sellerData, // Tutaj ustawiamy stan 'originalSeller'
      };
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "SET_NOTE":
      return { ...state, note: action.note };
    case "SET_SELECTED":
      return { ...state, selected: action.selected };
    case "SET_DATE":
      return { ...state, date: action.date };
    case "SET_NUMBER":
      return { ...state, number: action.number };
    case "SET_CHECK":
      return { ...state, check: action.check };
    case "SET_TITLE":
      return { ...state, title: action.title };
    case "SET_PRICE":
      return { ...state, price: action.price };
    case "SET_QUANTITY":
      return { ...state, quantity: action.quantity };
    case "SET_COUNT":
      const newCountState = { ...state, count: action.count };
      return {
        ...newCountState,
        number: `${newCountState.count}/${newCountState.year}/${newCountState.order}`,
      };
    case "SET_YEAR":
      const newYearState = { ...state, year: action.year };
      return {
        ...newYearState,
        number: `${newYearState.count}/${newYearState.year}/${newYearState.order}`,
      };
    case "SET_ORDER":
      const newOrderState = { ...state, order: action.order };
      return {
        ...newOrderState,
        number: `${newOrderState.count}/${newOrderState.year}/${newOrderState.order}`,
      };
    //error handling
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    case "SET_ERRORS_SELLER":
      return { ...state, errorsSeller: action.payload };
    case "CLEAR_ERROR":
      const newErrors = { ...state.errors };
      delete newErrors[action.fieldName];
      return { ...state, errors: newErrors };
    case "CLEAR_ERROR_SELLER":
      const newErrorsSeller = { ...state.errorsSeller };
      delete newErrorsSeller[action.fieldName];
      return { ...state, errorsSeller: newErrorsSeller };
    default:
      return state;
  }
};

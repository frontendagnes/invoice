import { today } from "../../assets/functions";
import { useLocalStorage } from "../../assets/utility/storage";

export const initialState = {
  count: 1,
  year: new Date().getFullYear(),
  order: "",
  number: "",
  date: today(),
  buyer: { name: "", street: "", zipcode: "", town: "", nip: "" },
  seller: { name: "", street: "", zipcode: "", town: "", nip: "" },
  selected: "przelew",
  note: "",
  error: "",
};

export const invoiceReducer = (state, action) => {
  switch (action.type) {
    case "SET_BUYER":
      return { ...state, buyer: { ...state.buyer, ...action.payload } };
    case "SET_SELLER":
      return { ...state, seller: { ...state.seller, ...action.payload } };
    case "LOAD_SELLER_FROM_DB":
      return {
        ...state,
        seller: { ...state.seller, ...action.payload }, // Ładuje dane, ale nie nadpisuje edytowanych
      };
    case "SET_COUNT":
      return { ...state, count: action.count };
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "SET_NOTE":
      return { ...state, note: action.note };
    case "SET_SELECTED":
      return { ...state, selected: action.selected };
    case "SET_DATE":
      return { ...state, date: action.date };
    case "SET_ORDER":
      return { ...state, order: action.order };
    case "SET_NUMBER":
      return { ...state, number: action.number };
    default:
      return state;
  }
};

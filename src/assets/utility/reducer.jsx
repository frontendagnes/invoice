export const initialState = {
  user: null,
  salesman: null,
  alert: {
    open: false,
    message: "",
    type: "success",
    vertical: "top",
    horizontal: "center",
  },
  amount: 0,
  numberInvoice: "",
  logo: null,
  costs: [
    //   {
    //   number: "123/2022",
    //   contractor: "Sklep spożywczy",
    //   date: "12.04.2022",
    //   amount: 123,
    // }
  ],
  selectedYear: new Date().getFullYear(),
  yearArray: [],
  contractors: [
    // {
    //   id: 1,
    //   data: {
    //     contractor: "Zuzia sprzedaje konie i psy także",
    //     nip: "123-985-58-54",
    //   },
    // },
    // {
    //   id: 2,
    //   data: { contractor: "Ala", nip: "965-365-65-65" },
    // },
    // {
    //   id: 3,
    //   data: { contractor: "Miko", nip: "896-289-28-54" },
    // },
  ],
  globalLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    // USER
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "DELETE_USER":
      return {
        ...state,
        user: null,
      };
    // SALESMAN
    case "SET_SALESMAN":
      return {
        ...state,
        salesman: action.item,
      };
    case "DELETE_SALSEMAN":
      return {
        ...state,
        salesman: null,
      };
    //Costs
    case "SET_COSTS":
      return {
        ...state,
        costs: action.item,
      };
    case "ADD_COSTS":
      return {
        ...state,
        costs: [...state.costs, action.item],
      };
    //contractors
    case "SET_CONTRACTORS":
      return {
        ...state,
        contractors: action.item,
      };
    //Snackbar
    case "ALLERT_DEFAULT":
      return {
        ...state,
        alert: {
          open: false,
          message: "",
          type: "success",
        },
      };
    case "ALERT__OK":
      return {
        ...state,
        alert: {
          open: true,
          message: `Zalogowano Poprawnie. Witaj ${action.item}`,
          type: "success",
        },
      };
    case "ALERT_LOGOUT":
      return {
        ...state,
        alert: {
          open: true,
          message: `Wylogowano poprawnie. Zapraszamy ponownie ${action.item}`,
          type: "success",
        },
      };
    case "ALERT__ERROR":
      return {
        ...state,
        alert: {
          open: true,
          message: `UPS... coś poszło nie tak - ${action.item}`,
          type: "error",
        },
      };
    case "ALERT_REGISETER":
      return {
        ...state,
        alert: {
          open: true,
          message: `Rejestracja przebiegła pomyślnie. Teraz możesz się zalogować`,
          type: "success",
        },
      };
    case "ALERT_ADD_INVOICE":
      return {
        ...state,
        alert: {
          open: true,
          message: `Gratualcje! Faktura została stworzona.`,
          type: "success",
        },
      };
    case "ALERT_DELETE":
      return {
        ...state,
        alert: {
          open: true,
          message: `Gratualcje! Fakturę usunięto poprawnie`,
          type: "success",
        },
      };
    case "ALERT__COSTSOK":
      return {
        ...state,
        alert: {
          open: true,
          message: `Gratulacje Koszt został dodany poprawnie`,
          type: "success",
        },
      };
    case "ALERT_SUCCESS":
      return {
        ...state,
        alert: {
          open: true,
          message: action.item,
          type: "success",
        },
      };
    // Count
    case "COUNT_INCREMENT":
      return {
        ...state,
        amount: state.amount++,
      };
    case "INVOICE_NUMBER":
      return {
        ...state,
        numberInvoice: `${action.count}/${action.year}/${action.order}`,
      };
    case "GET_COUNT":
      return {
        ...state,
        amount: action.item,
      };
    // selected Year
    case "SELECTED_YEAR":
      return {
        ...state,
        selectedYear: action.item,
      };
    case "SET_YEAR":
      return {
        ...state,
        yearArray: [...state.yearArray, action.item],
      };
    case "CLEAR_YEAR":
      return {
        ...state,
        yearArray: [],
      };
    //loading
    case "SET_GLOBAL_LOADING":
      return {
        ...state,
        globalLoading: true,
      };

    case "UNSET_GLOBAL_LOADING":
      return {
        ...state,
        globalLoading: false,
      };
    // LOGO
    case "SET_LOGO":
      return {
        ...state,
        logo: action.item,
      };

    default:
      return state;
  }
};

export default reducer;

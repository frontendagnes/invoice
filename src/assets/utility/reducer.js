export const initialState = {
  user: null,
  alert: {
    open: false,
    message: "",
    type: "success",
  },
  amount: 0,
  numberInvoice: "",
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
          message: `Rejestracja przebiegła pomyślnie. Witaj!`,
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
            message: `Gratualcje! Fakturę usunięto porawnie`,
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
    default:
      return state;
  }
};

export default reducer;

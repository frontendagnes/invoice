export const initialAlertState = {
  open: false,
  message: "",
  type: "success",
  vertical: "top",
  horizontal: "center",
};

export const alertReducer = (state = initialAlertState, action) => {
  switch (action.type) {
    case "ALERT_SUCCESS":
      return { ...state, open: true, message: action.item, type: "success" };
    case "ALERT__ERROR":
      return {
        ...state,
        open: true,
        message: `UPS... coś poszło nie tak - ${action.item}`,
        type: "error",
      };
    case "ALLERT_DEFAULT":
      return initialAlertState;
    case "ALERT__COSTSOK":
      return {
        ...state,
        open: true,
        message: `Gratulacje Koszt został dodany poprawnie`,
        type: "success",
      };
    case "ALERT_ADD_INVOICE":
      return {
        ...state,
        open: true,
        message: `Gratulacje! Faktura została stworzona.`,
        type: "success",
      };
    case "ALERT_DELETE":
      return {
        ...state,
        open: true,
        message: `Gratulacje! Element został usunięty poprawnie`,
        type: "success",
      };
    case "ALERT_REGISETER":
      return {
        ...state,
        open: true,
        message: `Rejestracja przebiegła pomyślnie. Teraz możesz się zalogować`,
        type: "success",
      };
    case "ALERT_LOGOUT":
      return {
        ...state,
        open: true,
        message: `Wylogowano poprawnie. Zapraszamy ponownie ${action.item}`,
        type: "success",
      };
    case "ALERT__OK":
      return {
        ...state,
        open: true,
        message: `Zalogowano Poprawnie. Witaj ${action.item}`,
        type: "success",
      };
    default:
      return state;
  }
};

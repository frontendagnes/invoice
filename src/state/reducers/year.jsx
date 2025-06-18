export const initialYearState = {
  selectedYear: new Date().getFullYear(),
  yearArray: [],
};

export const yearReducer = (state = initialYearState, action) => {
  switch (action.type) {
    case "SELECTED_YEAR":
      return { ...state, selectedYear: action.item };
    case "SET_YEAR":
      return { ...state, yearArray: [...state.yearArray, action.item] };
    case "CLEAR_YEAR":
      return { ...state, yearArray: [] };
    default:
      return state;
  }
};

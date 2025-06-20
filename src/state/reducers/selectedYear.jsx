// selectedYear.js
export const initialSelectedYearState = new Date().getFullYear();

export const selectedYearReducer = (state = initialSelectedYearState, action) => {
  switch (action.type) {
    case "SELECTED_YEAR":
      return action.item;
    default:
      return state;
  }
};

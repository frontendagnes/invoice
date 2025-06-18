// yearArray.js
export const initialYearArray = [];

export const yearArrayReducer = (state = initialYearArray, action) => {
  switch (action.type) {
    case "SET_YEAR":
      return [...state, action.item];
    case "CLEAR_YEAR":
      return [];
    default:
      return state;
  }
};

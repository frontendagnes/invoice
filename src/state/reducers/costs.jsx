export const initialCostsState = [];

export const costsReducer = (state = initialCostsState, action) => {
  switch (action.type) {
    case "SET_COSTS":
      return action.item;
    case "ADD_COSTS":
      return [...state, action.item];
    default:
      return state;
  }
};

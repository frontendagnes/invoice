export const initialSalesmanState = null;

export const salesmanReducer = (state = initialSalesmanState, action) => {
  switch (action.type) {
    case "SET_SALESMAN":
      return action.item;
    case "DELETE_SALSEMAN":
      return null;
    default:
      return state;
  }
};
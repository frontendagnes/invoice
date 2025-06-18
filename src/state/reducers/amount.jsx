export const initialAmountState = 0;

export const amountReducer = (state = initialAmountState, action) => {
  switch (action.type) {
    case "COUNT_INCREMENT":
      return state + 1;
    case "GET_COUNT":
      return action.item;
    default:
      return state;
  }
};

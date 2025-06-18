export const initialContractorsState = [];

export const contractorsReducer = (state = initialContractorsState, action) => {
  switch (action.type) {
    case "SET_CONTRACTORS":
      return action.item;
    default:
      return state;
  }
};
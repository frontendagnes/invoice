export const initialGlobalLoadingState = false;

export const globalLoadingReducer = (
  state = initialGlobalLoadingState,
  action
) => {
  switch (action.type) {
    case "SET_GLOBAL_LOADING":
      return true;
    case "UNSET_GLOBAL_LOADING":
      return false;
    default:
      return state;
  }
};

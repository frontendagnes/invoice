export const initialLogoState = null;

export const logoReducer = (state = initialLogoState, action) => {
  switch (action.type) {
    case "SET_LOGO":
      return action.item;
    default:
      return state;
  }
};
export const initialUserState = null;

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.user;
    case "DELETE_USER":
      return null;
    default:
      return state;
  }
};

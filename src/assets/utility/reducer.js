export const initialState = {
  user: null,
  invoices: [],
};

const reducer = (state, action) => {
  switch (action.type) {
   case "SET_USER":
     return{
       ...state,
       user: action.user,
     }
    case "DELETE_USER":
      return{
          ...state,
          user: null,
      }
    case "ADD_INVOICE":
      return{
        ...state,
        invoices: [...state.invoices, action.item]
      }
    default:
      return state;
  }
};                  

export default reducer;

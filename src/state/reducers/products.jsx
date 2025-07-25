export const initialProductsState = []

export const productsReducer = (state = initialProductsState, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return action.item;
    case "ADD_PRODUCT":
      return [...state, action.item];
    default:
      return state;
  }
};
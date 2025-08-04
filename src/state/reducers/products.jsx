export const initialProductsState = [];

export const productsReducer = (state = initialProductsState, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      // Przyjmuje, że action.item to nowa tablica produktów
      return action.item;
    case "ADD_PRODUCT":
      // Dodaje nowy produkt do istniejącej tablicy
      return [...state, action.item];
    case "UPDATE_PRODUCT_QUANTITY":
      // Mapuje bezpośrednio po stanie (który jest tablicą produktów)
      return state.map((product) =>
        product.id === action.id
          ? {
              ...product,
              data: { ...product.data, quantity: action.newQuantity },
            }
          : product
      );
    default:
      return state;
  }
};

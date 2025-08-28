// nie wykorzytywane

export const initialInvoiceState = "";

export const invoiceReducer = (state = initialInvoiceState, action) => {
  switch (action.type) {
    case "INVOICE_NUMBER":
      return `${action.count}/${action.year}/${action.order}`;
    default:
      return state;
  }
};
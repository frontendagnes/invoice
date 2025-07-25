import { combineReducers } from "./combine";
//reducers and state
import { userReducer, initialUserState } from "./reducers/user";
import { alertReducer, initialAlertState } from "./reducers/alert";
import { salesmanReducer, initialSalesmanState } from "./reducers/salesman";
import { amountReducer, initialAmountState } from "./reducers/amount";
import { invoiceReducer, initialInvoiceState } from "./reducers/invoice";
import { logoReducer, initialLogoState } from "./reducers/logo";
import { costsReducer, initialCostsState } from "./reducers/costs";
import {
  contractorsReducer,
  initialContractorsState,
} from "./reducers/contractors";
import { yearReducer, initialYearState } from "./reducers/year";
import {
  globalLoadingReducer,
  initialGlobalLoadingState,
} from "./reducers/globalLoading";
import {
  initialSelectedYearState,
  selectedYearReducer,
} from "./reducers/selectedYear";
import { initialYearArray, yearArrayReducer } from "./reducers/yearArray";
import { initialProductsState, productsReducer } from "./reducers/products";
export const initialState = {
  user: initialUserState,
  alert: initialAlertState,
  salesman: initialSalesmanState,
  amount: initialAmountState,
  numberInvoice: initialInvoiceState,
  logo: initialLogoState,
  costs: initialCostsState,
  contractors: initialContractorsState,
  year: initialYearState,
  globalLoading: initialGlobalLoadingState,
  selectedYear: initialSelectedYearState,
  yearArray: initialYearArray,
  products: initialProductsState,
};

export const rootReducer = combineReducers({
  user: userReducer,
  alert: alertReducer,
  salesman: salesmanReducer,
  amount: amountReducer,
  numberInvoice: invoiceReducer,
  logo: logoReducer,
  costs: costsReducer,
  contractors: contractorsReducer,
  year: yearReducer,
  globalLoading: globalLoadingReducer,
  selectedYear: selectedYearReducer,
  yearArray: yearArrayReducer,
  products: productsReducer,
});

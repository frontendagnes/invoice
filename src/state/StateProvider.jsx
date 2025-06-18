import { createContext, useContext, useReducer } from "react";
import { rootReducer, initialState } from "./index.jsx";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);

import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { StateProvider } from "./assets/utility/StateProvider";
import reducer, { initialState } from "./assets/utility/reducer";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <HashRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        // v7_fetcherPersist: true,
        // v7_normalizeFormMethod: true,
        // v7_partialHydration: true,
        // v7_skipActionErrorRevalidation: true,
      }}
    >
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </HashRouter>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

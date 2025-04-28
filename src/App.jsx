import React, { useEffect, Suspense, useCallback } from "react"; // Dodano useCallback
import "./App.css";
import { renderLoader } from "./assets/functions.jsx";
import { auth } from "./assets/utility/firebase.jsx";
import { useStateValue } from "./assets/utility/StateProvider.jsx";
import {
  onAuthStateChanged,
  orderBy,
  query,
} from "./assets/utility/firebase.jsx";
import { Routes, Route } from "react-router-dom";
import routesConfig from "./router/routes.jsx";
//components
import SnackBar from "./components/Snackbar/Snackbar.jsx";
import { useFirestoreCollection } from "./api/useFirestore/useFirestoreCollection.jsx";

function App() {
  const [{ user }, dispatch] = useStateValue();

  // Memoizowane funkcje mapujące i queryFn
  const mapInvoices = useCallback(
    (snapshot) =>
      snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })),
    []
  );

  const queryInvoices = useCallback(
    (ref) => query(ref, orderBy("number", "asc")),
    []
  );

  const mapYears = useCallback(
    (snapshot) => {
      dispatch({ type: "CLEAR_YEAR" });
      snapshot.docs.forEach((doc) => {
        dispatch({
          type: "SET_YEAR",
          item: {
            id: doc.id,
            data: doc.data(),
          },
        });
      });
    },
    [dispatch]
  ); // dispatch jako zależność

  const mapLogo = useCallback(
    (snapshot) => {
      snapshot.docs.forEach((doc) =>
        dispatch({ type: "SET_LOGO", item: doc.data().imageUrl })
      );
    },
    [dispatch]
  ); // dispatch jako zależność

  const mapNumber = useCallback(
    (snapshot) => {
      snapshot.docs.forEach((doc) =>
        dispatch({ type: "GET_COUNT", item: doc.data().count })
      );
    },
    [dispatch]
  ); // dispatch jako zależność

  const mapCosts = useCallback((snapshot) => {
    dispatch({
      type: "SET_COSTS",
      item: snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })),
    });
  }, []);

  const queryCosts = useCallback(
    (ref) => query(ref, orderBy("date", "desc")),
    []
  );

  const mapSeller = useCallback((snapshot) => {
    dispatch({
      type: "SET_SALESMAN",
      item: snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })),
    });
  }, []);

  // Użycie useFirestoreCollection
  const {
    data: invoicesData,
    loading: loadingInvoices,
    error: errorInvoices,
  } = useFirestoreCollection("invoices", "invoice", mapInvoices, queryInvoices);

  useFirestoreCollection("invoices", "years", mapYears);
  useFirestoreCollection("invoices", "logo", mapLogo);
  useFirestoreCollection("invoices", "number", mapNumber);
  useFirestoreCollection("invoices", "costs", mapCosts, queryCosts);
  useFirestoreCollection("invoices", "seller", mapSeller);

  useEffect(() => {
    const authUser = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "DELETE_USER",
        });
      }
    });
    return () => {
      authUser();
    };
  }, [dispatch]); // dispatch jako zależność

  return (
    <div className="app">
      <Suspense fallback={renderLoader()}>
        <Routes>
          {Object.values(routesConfig).map((route) => (
            <Route
              key={route.path}
              path={route.path}
              index={route.index}
              element={
                typeof route.element === "function"
                  ? route.element({ invoices: invoicesData })
                  : route.element
              }
            />
          ))}
        </Routes>
      </Suspense>
      <SnackBar />
    </div>
  );
}

export default App;

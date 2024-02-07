import React, { useEffect, useState, Suspense } from "react";
import "./App.css";
import { renderLoader } from "./assets/functions.jsx";
import { auth } from "./assets/utility/firebase.jsx";
import { useStateValue } from "./assets/utility/StateProvider.jsx";
import {
  db,
  onSnapshot,
  collection,
  doc,
  onAuthStateChanged,
  orderBy,
  query,
} from "./assets/utility/firebase.jsx";
import { Routes, Route } from "react-router-dom";
//components
import Header from "./components/Header/Header.jsx";
import CreateInvoice from "./components/CreateInvoice/CreateInvoice.jsx";
import Authorization from "./components/Authorization/Authoryzation.jsx";
import Invoices from "./components/Invoices/Invoices.jsx";
import Invoice from "./components/Invoice/Invoice.jsx";
import InvoicesDetails from "./components/InvoicesDetails.js/InvoicesDetails.jsx";
import SnackBar from "./components/Snackbar/Snackbar.jsx";
import NoMatch from "./components/NoMatch/NoMatch.jsx";
import Records from "./components/Records/Records.jsx";
import Costs from "./components/Costs/Costs.jsx";
import Footer from "./components/Footer/Footer.jsx";
function App() {
  const [invoices, setInvoices] = useState([]);
  const [{ user }, dispatch] = useStateValue();

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
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "invoices", user?.uid);
      const ref = collection(docRef, "invoice");
      const sortRef = query(ref, orderBy("number", "asc"));
      const unsb = onSnapshot(sortRef, (snap) => {
        setInvoices(
          snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
      return () => {
        unsb();
      };
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "invoices", user?.uid);
      const ref = collection(docRef, "logo");
      const unsb = onSnapshot(ref, (snap) => {
        snap.docs.map((doc) =>
          dispatch({ type: "SET_LOGO", item: doc.data().imageUrl })
        );
      });
      return () => {
        unsb();
      };
    }
  }, [user, dispatch]);
  useEffect(() => {
    if (user) {
      const docRef = doc(db, "invoices", user?.uid);
      const ref = collection(docRef, "number");
      const unsb = onSnapshot(ref, (snap) => {
        snap.docs.map((doc) =>
          dispatch({ type: "GET_COUNT", item: doc.data().count })
        );
      });
      return () => {
        unsb();
      };
    }
  }, [user, dispatch]);
  useEffect(() => {
    if (user) {
      const docRef = doc(db, "invoices", user?.uid);
      const ref = collection(docRef, "costs");
      const sortRef = query(ref, orderBy("date", "desc"));
      const unsb = onSnapshot(sortRef, (snap) => {
        dispatch({
          type: "SET_COSTS",
          item: snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        });
      });
      return () => {
        unsb();
      };
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "invoices", user?.uid);
      const ref = collection(docRef, "seller");
      const unsb = onSnapshot(ref, (snap) => {
        dispatch({
          type: "SET_SALESMAN",
          item: snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        });
      });
      return () => {
        unsb();
      };
    }
  }, [user, dispatch]);

  return (
    <div className="app">
      <Suspense fallback={renderLoader()}>
        <Routes>
          <Route path="/authorization" element={<Authorization />} />
          <Route
            index
            path="/"
            element={
              <div className="app__login">
                {user ? (
                  <>
                    <Header />
                    <CreateInvoice />
                    <Footer />
                  </>
                ) : (
                  <Authorization />
                )}
              </div>
            }
          />
          <Route
            path="/invoices"
            element={
              <>
                <Header />
                <Invoices data={invoices} />
                <Footer />
              </>
            }
          />
          <Route path="/invoice" element={<Invoice />}>
            <Route
              path=":invoiceId"
              element={
                <>
                  <Header />
                  <InvoicesDetails data={invoices} />
                </>
              }
            />
          </Route>
          <Route
            path="/costs"
            element={
              <>
                <Header />
                <Costs />
                <Footer />
              </>
            }
          />
          <Route
            path="/records"
            element={
              <div>
                <Header />
                <Records data={invoices} />
                <Footer />
              </div>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Suspense>
      <SnackBar />
    </div>
  );
}

export default App;
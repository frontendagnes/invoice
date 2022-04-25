import React, { useEffect, useState, Suspense } from "react";
import "./App.css";
import { auth } from "./assets/utility/firebase";
import { useStateValue } from "./assets/utility/StateProvider";
import {
  db,
  onSnapshot,
  collection,
  doc,
  onAuthStateChanged,
  orderBy,
  query,
} from "./assets/utility/firebase";
import { Routes, Route } from "react-router-dom";
//mui
import { CircularProgress } from "@mui/material";
//components
import Header from "./components/Header/Header";
import CreateInvoice from "./components/CreateInvoice/CreateInvoice";
import Authorization from "./components/Authorization/Authoryzation.js";
import Invoices from "./components/Invoices/Invoices";
import Invoice from "./components/Invoice/Invoice";
import InvoicesDetails from "./components/InvoicesDetails.js/InvoicesDetails";
import SnackBar from "./components/Snackbar/Snackbar";
import NoMatch from "./components/NoMatch/NoMatch";
import Records from "./components/Records/Records";
import Costs from "./components/Costs/Costs";
import Footer from "./components/Footer/Footer";
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
      const sortRef = query(ref, orderBy("number", "desc"));
      const unsb = onSnapshot(sortRef, (snap) => {
        console.log("invoices");
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
      const ref = collection(docRef, "number");
      const unsb = onSnapshot(ref, (snap) => {
        console.log("number");
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
        console.log("costs");
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
        console.log("seller");
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
  const renderLoader = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        alignItems: "center",
      }}
    >
      <CircularProgress color="success" />
      <span
        style={{
          marginLeft: "10px",
          letterSpacing: "3px",
        }}
      >
        Loading...
      </span>
    </div>
  );
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

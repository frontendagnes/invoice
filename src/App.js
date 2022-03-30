import React, { useEffect, useState, Suspense } from "react";
import "./App.css";
import { auth } from "./assets/utility/firebase";
import { useStateValue } from "./assets/utility/StateProvider";
import db from "./assets/utility/firebase";
import { Routes, Route } from "react-router-dom";
//mui
import { CircularProgress } from "@mui/material";
//components
import Header from "./components/Header/Header";
import CreateInvoice from "./components/CreateInvoice/CreateInvoice";
import Login from "./components/Login/Login";
import Invoices from "./components/Invoices/Invoices";
import Invoice from "./components/Invoice/Invoice";
import InvoicesDetails from "./components/InvoicesDetails.js/InvoicesDetails";
import SnackBar from "./components/Snackbar/Snackbar";
import NoMatch from "./components/NoMatch/NoMatch";
import Records from "./components/Records/Records";
import Costs from "./components/Costs/Costs";
function App() {
  const [invoices, setInvoices] = useState([]);

  const [{ user, costs }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
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
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      db.collection("invoices")
        .doc(user.uid)
        .collection("invoice")
        .orderBy("number", "desc")
        .onSnapshot((snapshot) => {
          setInvoices(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [user]);

  useEffect(() => {
    db.collection("invoices")
      .doc(user?.uid)
      .collection("number")
      .doc("YgYuBDoz5AisskTWslyB")
      .onSnapshot((snapshot) => {
        if (snapshot.data()) {
          dispatch({ type: "GET_COUNT", item: snapshot.data().count });
        }
      });
  }, [user, dispatch]);

  useEffect(() => {
    db.collection("invoices")
      .doc(user?.uid)
      .collection("costs")
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
          dispatch({
            type: "SET_COSTS",
            item: snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            })),
          });
      });
  }, [dispatch, costs]);
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
          <Route path="/login" element={<Login />} />
          <Route
            index
            path="/"
            element={
              <div className="app__login">
                {user ? (
                  <div>
                    <Header />
                    <CreateInvoice />
                  </div>
                ) : (
                  <Login />
                )}
              </div>
            }
          />
          <Route
            path="/invoices"
            element={
              <div>
                <Header />
                <Invoices data={invoices} />
              </div>
            }
          />
          <Route path="/invoice" element={<Invoice />}>
            <Route
              path=":invoiceId"
              element={
                <div>
                  <Header />
                  <InvoicesDetails data={invoices} />
                </div>
              }
            />
          </Route>
          <Route
            path="/costs"
            element={
              <>
                <Header />
                <Costs />
              </>
            }
          />
          <Route
            path="/records"
            element={
              <div>
                <Header />
                <Records data={invoices} />
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

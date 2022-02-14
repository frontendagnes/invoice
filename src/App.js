import React, { useEffect, useState } from "react";
import "./App.css";
import { auth } from "./assets/utility/firebase";
import { useStateValue } from "./assets/utility/StateProvider";
import db from "./assets/utility/firebase";
import { Routes, Route, useLocation } from "react-router-dom";
//components
import Header from "./components/Header/Header";
import CreateInvoice from "./components/CreateInvoice/CreateInvoice";
import Login from "./components/Login/Login";
import Invoices from "./components/Invoices/Invoices";
import Invoice from "./components/Invoice/Invoice";
import InvoicesDetails from "./components/InvoicesDetails.js/InvoicesDetails";
import SnackBar from "./components/Snackbar/Snackbar";
import NoMatch from "./components/NoMatch/NoMatch";
function App() {
  const [invoices, setInvoices] = useState([]);
  const [{ user, amount }, dispatch] = useStateValue();
  const history = useLocation();
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
        dispatch({ type: "GET_COUNT", item: snapshot.data().count });
      });
  }, [amount, dispatch, user]);

  useEffect(() => {
    // if(user){
    //   return history("/")
    // }else{
    //   return history("/login")
    // }
    // return() => user
  }, [user, history]);
  return (
    <div className="app">
      <Routes>
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
        <Route path="/login" element={<Login />} />
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
            element={<InvoicesDetails data={invoices} />}
          />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <SnackBar />
    </div>
  );
}

export default App;

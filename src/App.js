import React, { useEffect, useState } from "react";
import "./App.css";
import { auth } from "./assets/utility/firebase";
import { useStateValue } from "./assets/utility/StateProvider";
import db from "./assets/utility/firebase";
import { Routes, Route } from "react-router-dom";
//components
import Header from "./components/Header/Header";
import CreateInvoice from "./components/CreateInvoice/CreateInvoice";
import Login from "./components/Login/Login";
import Invoices from "./components/Invoices/Invoices";
import Invoice from "./components/Invoice/Invoice";
import InvoicesDetails from "./components/InvoicesDetails.js/InvoicesDetails";
function App() {
  const [invoices, setInvoices] = useState([]);
  const [{ user }, dispatch] = useStateValue();

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
        .orderBy("date", "desc")
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

  return (
    <div className="app">
      <Routes>
        <Route
          index
          path="/"
          element={
            <div>
              <Header />
              <CreateInvoice />
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
        <Route path="/invoice" element={<Invoice data={invoices} />}>
          <Route path=":invoiceId" element={<InvoicesDetails data={invoices} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

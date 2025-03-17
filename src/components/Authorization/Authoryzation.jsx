import React from "react";
import "./Authoryzation.css";
import logo from "../../assets/pic/logo.webp";
import { Link } from "react-router-dom";
import useAuth from "@/api/useAuth/useAuth";
//components
import TabGenerator from "../TabGenerator/TabGenerator.jsx";
import Login from "./Login/Login.jsx";
import Registration from "./Registaration/Registration.jsx";
import Footer from "../Footer/Footer.jsx";
import AuthDescription from "./AuthDescription.jsx";
import ValidationError from "../ValidationError/ValidationError.jsx";
import { GoogleButton } from "@/components/GoogleButton/GoogleButton.jsx";

function Authoryzation() {
  const { signInGoogle, loading, error } = useAuth();

  const tabs = [
    {
      label: "Login",
      content: <Login />,
    },
    {
      label: "Rejestracja",
      content: <Registration />,
    },
  ];
  return (
    <div className="authoryzation">
      <div className="authoryzation__top">
        <img src={logo} alt="Fakturka 2.0" title="Fakturka 2.0" />
      </div>
      <div className="authoryzation__middle">
        <AuthDescription />
        <div className="authoryzation__form">
          <div className="authoryzation__validate">
            <ValidationError text={error} />
          </div>
          <TabGenerator tabs={tabs} />
          <div className="authoryzation__forgotPassword">
            <Link to="/password-recovery">Zapomniałeś hasła?</Link>
          </div>
          <div className="authoryzation__loginWithGoogle">
            <GoogleButton onClick={signInGoogle} loading={loading} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Authoryzation;

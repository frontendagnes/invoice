import React, { useState } from "react";
import "./Authoryzation.css";
import logo from "../../assets/pic/logo.webp";
import { useStateValue } from "../../assets/utility/StateProvider.jsx";
import { useNavigate, Link } from "react-router-dom";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  provider,
} from "../../assets/utility/firebase.jsx";
import { validateRegister } from "./validate.js";

//components
import TabGenerator from "../TabGenerator/TabGenerator.jsx";
import Login from "./Login/Login.jsx";
import Registration from "./Registaration/Registration.jsx";
import Footer from "../Footer/Footer.jsx";
import AuthDescription from "./AuthDescription.jsx";

// import GoogleButton from "react-google-button";

function Authoryzation() {
  const [nameReg, setNameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [{ yearArray, user }, dispatch] = useStateValue();
  const history = useNavigate();
  // filter antyspam
  const [test, setTest] = useState("");

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        if (result) {
          history("/");
          dispatch({ type: "ALERT__OK", item: result.user.email });
        }
      })
      .catch((error) =>
        dispatch({ type: "ALERT__ERROR", item: error.message })
      );
  };
  const register = (e) => {
    e.preventDefault();

    const msg = validateRegister(nameReg, passwordReg, test, repeatPassword);
    if (msg) {
      setError(msg);
      return;
    }

    createUserWithEmailAndPassword(auth, nameReg, passwordReg)
      .then(() => {
        history("/authorization");
        dispatch({ type: "ALERT_REGISETER" });
      })
      .catch((error) => {
        console.log("Create user error>>>", error);
        dispatch({ type: "ALERT__ERROR", item: error.message });
      });
  };
  const tabs = [
    {
      label: "Login",
      content: <Login />,
    },
    {
      label: "Rejestracja",
      content: (
        <Registration
          name={nameReg}
          setName={setNameReg}
          password={passwordReg}
          setPassword={setPasswordReg}
          repeatPassword={repeatPassword}
          setRepeatPassword={setRepeatPassword}
          register={register}
        />
      ),
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
          <TabGenerator tabs={tabs} />
          <div className="authoryzation__forgotPassword">
            <Link to="/password-recovery">Zapomniałeś hasła?</Link>
          </div>
          <div className="authoryzation__loginWithGoogle">
            {/* <GoogleButton onClick={signInGoogle} type="light" /> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Authoryzation;

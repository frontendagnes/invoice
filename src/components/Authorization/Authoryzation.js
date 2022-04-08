import React, { useState } from "react";
import "./Authoryzation.css";
import logo from "../../assets/pic/logo.webp";
import TabGenerator from "../TabGenerator/TabGenerator";
import Login from "./Login/Login";
import Registration from "./Registaration/Registration";
import AntySpam from "../AntySpam/AntySpam";
import { useStateValue } from "../../assets/utility/StateProvider";
import { useNavigate } from "react-router-dom";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../../assets/utility/firebase.js";
import ValidationError from "../ValidationError/ValidationError";
import { validateLogin, validateRegister } from "./validate";

function Authoryzation() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameReg, setNameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const history = useNavigate();
  // filter antyspam
  const [test, setTest] = useState("");
  const signIn = (e) => {
    e.preventDefault();

    const msg = validateLogin(name, password, test);
    if (msg) {
      setError(msg);
      return;
    }

    signInWithEmailAndPassword(auth, name, password)
      .then((user) => {
        if (user) {
          history("/");
          dispatch({ type: "ALERT__OK", item: user.user.email });
        } else {
          dispatch({ type: "ALERT__ERROR" });
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
        history("/");
        dispatch({ type: "ALERT_REGISETER" });
      })
      .catch((error) => {
        console.log("Error>>>", error);
        dispatch({ type: "ALERT__ERROR", item: error.message });
      });
  };
  return (
    <div className="authoryzation">
      <div className="authoryzation__top">
        <img src={logo} alt="Fakturka 2.0" />
      </div>
      <div className="authoryzation__middle">
        <div className="authoryzation__wrapper">
          <div className="authoryzation__descryption">
            Lorem iNesciunt veritatis exercitationem ducimus non eveniet quis.
            Vel ut voluptate voluptatem sed porro. Non itaque illum aut omnis
            labore et iste quibusdam. Modi sunt sunt libero neque quis at omnis
            dolor recusandae. Maiores ut pariatur quia saepe consequuntur
            facere. Quisquam porro laborum dolor dignissimos sit ipsam vitae
            voluptatibus. Et nisi quis veritatis in. Aliquid vel molestiae aut.
            Dolorum ea quia molestias eius. Nesciunt ex optio. Optio ea aut
            facere nobis iure sapiente. Magni asperiores deserunt possimus
            pariatur sunt molestias quia. Veritatis dignissimos cupiditate vero
            ab autem in eligendi aliquam. Eos voluptatum nostrum modi corporis
            asperiores repudiandae voluptates. Deserunt eaque laboriosam sed ut
            voluptas excepturi. Aut nobis harum et est. Excepturi perspiciatis
            quod ut.
          </div>
          <div className="authoryzation__form">
            <div className="authoryzation__validate">
              {error ? <ValidationError text={error} /> : null}
            </div>
            <TabGenerator
              component={
                <Login
                  error={error}
                  name={name}
                  setName={setName}
                  password={password}
                  setPassword={setPassword}
                  signIn={signIn}
                />
              }
              component1={
                <Registration
                  error={error}
                  name={nameReg}
                  setName={setNameReg}
                  password={passwordReg}
                  setPassword={setPasswordReg}
                  repeatPassword={repeatPassword}
                  setRepeatPassword={setRepeatPassword}
                  register={register}
                />
              }
              title="Login"
              title1="Rejestracja"
            />
          </div>
        </div>
      </div>
      <footer>
        &copy; <a href="https://frontend-agnes.pl" title="frontend-agnes.pl" alt="frontend-agnes.pl">frontend-agnes</a>
      </footer>
      <AntySpam test={test} setTest={setTest} />
    </div>
  );
}

export default Authoryzation;

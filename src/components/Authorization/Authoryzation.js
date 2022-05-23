import React, { useState } from "react";
import "./Authoryzation.css";
import logo from "../../assets/pic/logo.webp";
import { useStateValue } from "../../assets/utility/StateProvider";
import { useNavigate } from "react-router-dom";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  provider,
} from "../../assets/utility/firebase.js";
import { validateLogin, validateRegister } from "./validate";

//components
import ValidationError from "../ValidationError/ValidationError";
import TabGenerator from "../TabGenerator/TabGenerator";
import Login from "./Login/Login";
import Registration from "./Registaration/Registration";
import AntySpam from "../AntySpam/AntySpam";
import Footer from "../Footer/Footer";
import GoogleButton from "react-google-button";

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

  const signIn = (e) => {
    e.preventDefault();

    const msg = validateLogin(name, password, test);
    if (msg) {
      setError(msg);
      return;
    }

    signInWithEmailAndPassword(auth, name, password)
      .then((result) => {
        if (result) {
          history("/");
          dispatch({ type: "ALERT__OK", item: result.user.email });
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
        history("/authorization");
        dispatch({ type: "ALERT_REGISETER" });
      })
      .catch((error) => {
        console.log("Create user error>>>", error);
        dispatch({ type: "ALERT__ERROR", item: error.message });
      });
  };
  return (
    <div className="authoryzation">
      <div className="authoryzation__top">
        <img src={logo} alt="Fakturka 2.0" title="Fakturka 2.0" />
      </div>
      <div className="authoryzation__middle">
        <div className="authoryzation__descryption">
          <p>
            Prowadzisz firmę bez rejestracji na podstawie{" "}
            <b>art. 5 ust. 1 Prawa przedsiębiorców </b>
            ta aplikacja jest dla Ciebie
          </p>
          <p>
            Tutaj wystawisz faktury bez VAT a dodatkowo aplikacja za Ciebie
            wykona wszystko co niezbędne:
          </p>
          <ul>
            <li>Policzy przychód każdego miesiąca, także narastająco</li>
            <li>Pomoże w wyszukaniu już wystwionych faktur i kosztów</li>
            <li>Tutaj wprowdzisz równiwż koszty</li>
            <li>
              W aplikacji zobaczysz podsumowanie każdego miesiąca jak równiż
              całego roku(to się przyda przy rozliczeniu rocznym)
            </li>
          </ul>
          <p>
            Wszystko to dzieje się automatycznie tylko po dodaniu faktury będź
            kosztu
          </p>
          <p>
            Żmudne tworzenie faktur i wyliczeń w arkuszu kalkulacyjnym to już
            przeszłość, ten progam zrobi wszystko za Ciebie
          </p>
          <p>
            <b style={{ color: "red" }}>UWAGA:</b> to jest wersja demonstracyjna
            nie wporwadzaj prawdziwych danych, administrator może je usunąć w
            każdej chwili
          </p>
          <p>
            Chcesz skorzystać z aplikacji skontaktuj się z administratorem
            którym jest{" "}
            <a
              href="https://frontend-agnes.pl"
              alt="https://frontend-agnes.pl"
              title="https://frontend-agnes.pl"
            >
              frontend-agnes
            </a>
          </p>
          <p>
            W celu przetestowania aplikacji możesz użyć następujących danych:
          </p>
          <p>
            <span>
              <b>login:</b> aga@kam.com
            </span>
            <br />
            <span>
              <b>hasło:</b> agakam
            </span>
          </p>
        </div>
        <div className="authoryzation__form">
          <div className="authoryzation__validate">
            {error ? <ValidationError text={error} /> : null}
          </div>
          <TabGenerator
            component={
              <Login
                name={name}
                setName={setName}
                password={password}
                setPassword={setPassword}
                signIn={signIn}
                loginGoogle={signInGoogle}
              />
            }
            component1={
              <Registration
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
          <div className="authoryzation__loginWithGoogle">
            <GoogleButton onClick={signInGoogle} type="light" />
          </div>
        </div>
      </div>
      <AntySpam test={test} setTest={setTest} />
      <Footer />
    </div>
  );
}

export default Authoryzation;

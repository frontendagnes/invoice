import React, { useState } from "react";
import "./Login.css";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { auth } from "../../assets/utility/firebase";
import ValidationError from "../ValidationError/ValidationError";
import { useStateValue } from "../../assets/utility/StateProvider";

const validate = (email, password, test) => {
  if (!email) {
    return "E-mail jest wymagany";
  } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
    return "Zły format e-mail";
  }
  if (!password) {
    return "Hasło jest wymagane";
  }
  if (password.length < 6) {
    return "Hasło powinno mieć conajmniej 6 znaków";
  }
  if (test) {
    return "Nie przeszedłeś filtra antyspamowego. Odśwież stronę i spróbuj jeszcze raz";
  }
  return null;
};
function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();
  // filter antyspam
  const [test, setTest] = useState("");

  const [{ user }, dispatch] = useStateValue();

  const signIn = (e) => {
    e.preventDefault();
    const msg = validate(name, password, test);
    if (msg) {
      setError(msg);
      return;
    }
    auth
      .signInWithEmailAndPassword(name, password)
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
    const msg = validate(name, password, test);
    if (msg) {
      setError(msg);
      return;
    }
    auth
      .createUserWithEmailAndPassword(name, password)
      .then(() => {
        history("/");
        dispatch({ type: "ALERT_REGISETER" });
      })
      .catch((error) =>
        dispatch({ type: "ALERT__ERROR", item: error.message })
      );
  };
  return (
    <div className="login">
      {error ? <ValidationError text={error} /> : null}
      <div className="login__wrapper">
        <h2>Formularz logowania i rejestracji</h2>
        <form>
          <div className="login__inputs">
            <div className="login__row">
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="outlined-basic"
                label="Wpisz e-mail"
                variant="outlined"
              />
            </div>
            <div className="login__row">
              <TextField
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                id="outlined-basic"
                label="Wpisz hasło"
                variant="outlined"
              />
            </div>
            {/* input do celów weryfikacyjnych */}
            <input
              type="text"
              className="login__phone"
              value={test}
              onChange={(e) => setTest(e.target.value)}
            />
          </div>
          <div className="login__buttons">
            <button type="button" onClick={signIn}>
              Zaloguj się
            </button>
            <span>lub</span>
            <button type="button" onClick={register}>
              Zarejestruj się
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

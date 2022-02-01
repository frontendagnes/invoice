import React, { useState } from "react";
import "./Login.css";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../../assets/utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(name, password)
      .then((user) => {
        if (user) {
          history("/");
        } else {
          alert("Coś poszło nie tak");
        }
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(name, password)
      .then(() => {
        console.log("zarejestrowano");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
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
            <input type="text" className="login__phone" />
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

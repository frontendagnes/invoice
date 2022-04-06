import React, { useState } from "react";
import "./Login.css";
import TextField from "@mui/material/TextField";

function Login({name, setName, password, setPassword, signIn}) {
  return (
    <div className="login">
        <form>
          <div className="authoryzation__inputs">
            <div className="authoryzation__row">
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Wpisz e-mail"
                variant="outlined"
              />
            </div>
            <div className="authoryzation__row">
              <TextField
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                label="Wpisz hasło"
                variant="outlined"
              />
            </div>

          </div>
          <div className="authoryzation__buttons">
            <button type="button" onClick={signIn}>
              Zaloguj się
            </button>
          </div>
        </form>
      </div>
  );
}

export default Login;

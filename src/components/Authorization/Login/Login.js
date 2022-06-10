import React from "react";
import "./Login.css";
import TextField from "@mui/material/TextField";
import Form from "../../Form/Form";
import { Button } from "@mui/material";

function Login({name, setName, password, setPassword, signIn }) {
  return (
    <div className="login">
        <Form>
          <div className="authoryzation__inputs">
            <div className="authoryzation__row">
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Wpisz e-mail"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="authoryzation__row">
              <TextField
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                label="Wpisz hasło"
                variant="outlined"
                fullWidth
              />
            </div>

          </div>
          <div className="authoryzation__buttons">
            <Button type="button" onClick={signIn}>
              Zaloguj się
            </Button>
          </div>
        </Form>
        
      </div>
  );
}

export default Login;

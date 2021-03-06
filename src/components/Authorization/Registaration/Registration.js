import { Button, TextField } from "@mui/material";
import React from "react";
import Form from "../../Form/Form";
import "./Registration.css";
function Registration({
  name,
  setName,
  password,
  setPassword,
  register,
  repeatPassword,
  setRepeatPassword,
}) {
  return (
    <div className="registration">
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
          <div className="authoryzation__row">
            <TextField
              value={repeatPassword}
              type="password"
              onChange={(e) => setRepeatPassword(e.target.value)}
              label="Powtórz hasło"
              variant="outlined"
              fullWidth
            />
          </div>
        </div>
        <div className="authoryzation__buttons">
          <Button type="button" onClick={register}>
            Zarejestruj się
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Registration;

import React, { useState } from "react";
import "./Login.css";

import { useStateValue } from "@/assets/utility/StateProvider";
import { login } from "@/assets/utility/apiAuthoryzation";

import { useNavigate } from "react-router-dom";
import { validateLogin, valideateTest } from "../validate";
//mui
import { Button } from "@mui/material";
// components
import Form from "@/components/Form/Form";
import InputField from "../InputField";
import ValidationError from "../../ValidationError/ValidationError";
import AntySpam from "../../AntySpam/AntySpam";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [test, setTest] = useState("");
  const [testError, setTestError] = useState("");
  const [errors, setErrors] = useState({});

  const [{ alert }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const msgTestError = valideateTest(test);
    if (msgTestError) {
      setTestError(msgTestError);
      return;
    }

    const msg = validateLogin(formData);
    if (msg) {
      setErrors(msg);
      return;
    }
    login(formData, navigate, dispatch);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Aktualizujemy wartości inputów
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Sprawdzamy tylko jedno pole, zamiast walidować cały formularz na raz
    setErrors((prev) => {
      const newErrors = validateLogin({ ...formData, [name]: value });
      return {
        ...prev,
        [name]: newErrors?.[name] || "", // Jeśli walidacja zwróci pusty błąd, usuwamy go
      };
    });
  };
  return (
    <div className="login">
      <Form>
        <div className="authoryzation__inputs">
          <div className="authoryzation__row">
            <InputField
              name="email"
              error={errors.email}
              helperText={errors.email}
              value={formData.email}
              onChange={handleChange}
              label="Wpisz e-mail"
            />
          </div>
          <div className="authoryzation__row">
            <InputField
              name="password"
              error={errors.password}
              helperText={errors.password}
              value={formData.password}
              type="password"
              onChange={handleChange}
              label="Wpisz hasło"
            />
          </div>
          <AntySpam test={test} setTest={setTest} />
        </div>
        <div className="authoryzation__buttons">
          <Button
            type="button"
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Zaloguj się
          </Button>
        </div>
        <ValidationError text={testError} />
      </Form>
    </div>
  );
}

export default Login;

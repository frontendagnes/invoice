import React, { useState } from "react";
import "./Registration.css";

import useAuth from "@/api/useAuth/useAuth";
import { validateRegister, valideateTest } from "../validate";

//mui
import { Button } from "@mui/material";
//components
import Form from "../../Form/Form";
import InputField from "../InputField";
import ValidationError from "../../ValidationError/ValidationError";
import AntySpam from "../../AntySpam/AntySpam";

function Registration() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const { register, loading, error } = useAuth();
  const [test, setTest] = useState("");
  const [testError, setTestError] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const msgTestError = valideateTest(test);
    if (msgTestError) {
      setTestError(msgTestError);
      console.log("testError", testError);
      return;
    }

    const msg = validateRegister(formData);
    if (msg) {
      setErrors(msg);
      return;
    }
    await register(formData.email, formData.password);
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
      const newErrors = validateRegister({ ...formData, [name]: value });
      return {
        ...prev,
        [name]: newErrors?.[name] || "", // Jeśli walidacja zwróci pusty błąd, usuwamy go
      };
    });
  };
  return (
    <div className="registration">
      <Form onSubmit={handleSubmit}>
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
          <div className="authoryzation__row">
            <InputField
              name="repeatPassword"
              error={errors.repeatPassword}
              helperText={errors.repeatPassword}
              value={formData.repeatPassword}
              type="password"
              onChange={handleChange}
              label="Powtórz hasło"
            />
          </div>
          <AntySpam test={test} setTest={setTest} />
        </div>
        <div className="authoryzation__buttons">
          <Button type="submit" variant="contained" color="primary">
            {loading ? "Rejestracja...." : "Zarejestruj się"}
          </Button>
        </div>
        <ValidationError text={error} />
        <ValidationError text={testError} />
      </Form>
    </div>
  );
}

export default Registration;

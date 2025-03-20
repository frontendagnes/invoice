import React, { useState } from "react";
import "./Login.css";

import useAuth from "@/api/useAuth/useAuth";
import { validateLogin, valideateTest } from "../validate";

//mui
import { Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
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
  const { login, loading, error } = useAuth();

  const [test, setTest] = useState("");
  const [testError, setTestError] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
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
    await login(formData.email, formData.password);
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
      <div className="authoryzation__validate">
        <ValidationError text={error} />
        <ValidationError text={testError} />
      </div>
      <Form onSubmit={handleSubmit}>
        <div className="authoryzation__inputs">
          <div className="authoryzation__row">
            <InputField
              name="email"
              error={errors.email}
              helperText={errors.email}
              value={formData.email}
              icon={<EmailIcon />}
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
              icon={<KeyIcon />}
              onChange={handleChange}
              label="Wpisz hasło"
            />
          </div>
          <AntySpam test={test} setTest={setTest} />
        </div>
        <div className="authoryzation__buttons">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{
              "&:disabled": {
                opacity: 0.6,
                cursor: "not-allowed",
                color: "#80808080",
              },
            }}
          >
            {loading ? "Logowanie..." : "Zaloguj się"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;

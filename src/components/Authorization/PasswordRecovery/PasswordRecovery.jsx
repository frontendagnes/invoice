import React, { useState } from "react";
import "./PasswordRecovery.css";

import { useNavigate } from "react-router-dom";
import ValidationError from "@/components/ValidationError/ValidationError.jsx";
import logo from "@/assets/pic/logo.webp";
import useAuth from "../../../api/useAuth/useAuth";

//mui
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import { InputAdornment } from "@mui/material";

const validateEmail = (email) => {
  if (!email) return "E-mail jest wymagany";
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email))
    return "Zły format e-mail";
  return null;
};

function PasswordRecovery() {
  const [email, setEmail] = useState("");
  const [errorTest, setErrorTest] = useState("");

  const navigate = useNavigate();
  const { resetPassword, loading, error } = useAuth();

  const handlePasswordRecovery = (e) => {
    e.preventDefault();
    const validationMessage = validateEmail(email);
    if (validationMessage) {
      setErrorTest(validationMessage);
      return;
    }
    resetPassword(email);
  };

  return (
    <div className={`passwordRecovery`}>
      <img src={logo} alt="logo" />
      <Button
        className="passwordRecovery__backButton"
        startIcon={<ArrowBackIosIcon />}
        onClick={() => navigate("/")}
        variant="contained"
        color="primary"
        sx={{
          position: "absolute",
          top: "100px",
          left: "40px",
          padding: "10px 20px",
        }}
      >
        Wróć na stronę Logowania
      </Button>
      <h1>Resetowanie hasła</h1>
      <form onSubmit={handlePasswordRecovery}>
        <label htmlFor="email">
          Wpisz zarejestrowany adres email na który zostanie wysłany link do
          zmiany hasła.
        </label>
        <TextField
          error={errorTest ? true : false}
          id="email"
          type="email"
          placeholder="Tutaj wpisz adres email" 
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorTest(validateEmail(e.target.value));
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{<EmailIcon />}</InputAdornment>
            ),
          }}
          fullWidth
          autoFocus
        />
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
          {loading ? "Wysyłanie ..." : "Wyślij"}
        </Button>
      </form>
      <div className="passwordRecovery__error">
        <ValidationError text={errorTest} />
        <ValidationError text={error} />
      </div>
    </div>
  );
}

export default PasswordRecovery;

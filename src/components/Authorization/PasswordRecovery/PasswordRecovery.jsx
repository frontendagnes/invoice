import React, { useState } from "react";
import "./PasswordRecovery.css";
import { auth, sendPasswordResetEmail } from "@/assets/utility/firebase.jsx";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "@/assets/utility/StateProvider";
import ValidationError from "@/components/ValidationError/ValidationError.jsx";
import logo from "@/assets/pic/logo.webp";

//mui
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const validateEmail = (email) => {
  if (!email) return "E-mail jest wymagany";
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email))
    return "Zły format e-mail";
  return null;
};

function PasswordRecovery() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [{ alert }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const resetPassword = async () => {
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      dispatch({
        type: "ALERT_SUCCESS",
        item: "Jeśli e-mail jest poprawny, instrukcje resetowania hasła zostały wysłane.",
      });
      setEmail("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePasswordRecovery = (e) => {
    e.preventDefault();
    const validationMessage = validateEmail(email);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }
    resetPassword();
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
        <label for="email">
          Wpisz zarejestrowany adres email na który zostanie wysłany link do zmiany hasła.
        </label>
        <TextField
          error={error ? true : false}
          id="email"
          type="email"
          placeholder="Tutaj wpisz adres email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(validateEmail(e.target.value));
          }}
          fullWidth
          autoFocus
        />
        <Button type="submit" variant="contained" color="primary">
          Wyślij
        </Button>
      </form>
      <div className="passwordRecovery__error">
        <ValidationError text={error} />
      </div>
    </div>
  );
}

export default PasswordRecovery;

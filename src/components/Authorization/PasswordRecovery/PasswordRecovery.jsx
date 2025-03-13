import React, { useState } from "react";
import "./PasswordRecovery.css";

import { useNavigate } from "react-router-dom";

function PasswordRecovery() {
  const [email, setEmail] = useState("");

  const history = useNavigate();

  const handlePasswordRecovery = (e) => {
    e.preventDefault();

    console.log("Wyslano");
  };
  const handleClicked = () => {
    history("/");
  };
  return (
    <div className="passwordRecovery">
      <button onClick={handleClicked}>back</button>
      <form onSubmit={handlePasswordRecovery}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Wyślij</button>
      </form>
    </div>
  );
}

export default PasswordRecovery;

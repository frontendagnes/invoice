import React from "react";
import "./NoMatch.css";

import { useLocation, useNavigate } from "react-router-dom";
function NoMatch() {
  const location = useLocation();
  const history = useNavigate()

  const handleClick = () =>{
    history("/")
  }
  return (
    <div className="noMatch">
      <div className="noMatch__top">
        Adres <span>{location.pathname}</span> nie istnieje
      </div>
      <div className="noMatch__bottom">
        <button onClick={handleClick}>Wróć na stronę główną</button>
      </div>
    </div>
  );
}

export default NoMatch;

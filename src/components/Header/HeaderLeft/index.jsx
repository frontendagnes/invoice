import React from 'react'
import { Link } from "react-router-dom";
import logo from "../../../assets/pic/logo.webp";

function HeaderLeft() {
  return (
    <div className="header__left">
      <Link to="/">
        <img src={logo} title="Fakturka 2.0" alt="Logo.webp" />
      </Link>
    </div>
  );
}

export default HeaderLeft
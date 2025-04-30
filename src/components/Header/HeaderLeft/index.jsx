import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/pic/logo.webp";
import ViewSelectedYear from "@/components/ViewSelectedYear";
function HeaderLeft() {
  return (
    <div className="header__left">
      <Link to="/">
        <img src={logo} title="Fakturka 2.0" alt="Logo.webp" />
      </Link>
    </div>
  );
}

export default HeaderLeft;

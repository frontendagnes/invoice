import React from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../../assets/utility/StateProvider";
// import { signOut } from "firebase/auth";
import { auth } from "../../assets/utility/firebase";

function Header() {
  const [{ user }, dispatch] = useStateValue();
  const history = useNavigate()
  const logout = () => {
    auth.signOut();
    history("./login")
  };
  return (
    <div className="header">
    <div className="header__left">
        <Link to="/invoices"><div>Pokaż wszystkie faktury</div></Link>
    </div>
      <div className="header__right">
        <div>Witaj, {user?.email}</div>
        <button type="button" onClick={logout}>
          Wyloguj
        </button>
      </div>
    </div>
  );
}

export default Header;

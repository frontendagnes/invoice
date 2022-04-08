import React, { useState } from "react";
import "./Header.css";
import { useNavigate, Link } from "react-router-dom";
import { useStateValue } from "../../assets/utility/StateProvider";
import { auth, signOut } from "../../assets/utility/firebase";
import logo from "../../assets/pic/logo.webp";
// mui
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//comonents
import Menu from "../Menu/Menu";


function Header() {
  const [settingsView, setSettingsView] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const history = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "ALERT_LOGOUT", item: user?.email });
        dispatch({ type: "GET_COUNT", item: null })
        history("/");
      })
      .catch((error) => {
        dispatch({ type: "ALERT__ERROR", item: error.message });
      });
  };

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img src={logo} title="Fakturka 2.0" alt="Logo.webp" />
        </Link>
      </div>
      <Menu />
      <div className="header__right">
        <div
          className="header__user"
          onClick={() => setSettingsView(!settingsView)}
        >
          <div>
            <div>Jestś zalogowany jako,</div>
            <div>{user?.email}</div>
          </div>
          <ExpandMoreIcon fontSize="large" />
        </div>
        <div
          className="header__pulldownMenu"
          style={{
            transform: settingsView ? "scaleY(1)" : "scaleY(0)",
          }}
        >
          <ul className="header__settingsUl">
            <li onClick={logout}>Wyloguj</li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;

import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useStateValue } from "../../assets/utility/StateProvider";
import { auth } from "../../assets/utility/firebase";
import GoHome from "../GoHomeButton/GoHome";
import LogoutIcon from "@mui/icons-material/Logout";
function Header() {
  const [home, setHome] = useState("false");
  const [{ user }, dispatch] = useStateValue();
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/invoices") {
      // localStorage.setItem("home", true)
      setHome(true);
    } else if (location.pathname === "/") {
      // localStorage.setItem("home", false)
      setHome(false);
    }

    // setHome(localStorage.getItem("home"));
  }, [location.pathname]);

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        dispatch({ type: "ALERT_LOGOUT", item: user?.email });
        history("/");
      })
      .catch((error) => {
        dispatch({ type: "ALERT__ERROR", item: error.message });
      });
  };
  const handleGoHome = () => {
    localStorage.setItem("home", true);
    setHome(localStorage.getItem("home"));
  };

  return (
    <div className="header">
      <div className="header__left">
        {home ? (
          <GoHome setHome={setHome} />
        ) : (
          <Link to="/invoices" onClick={handleGoHome}>
            Zestawienie faktur
          </Link>
        )}
      </div>
      <div className="header__right">
        <div>
          Witaj, <b>{user?.email}</b>
        </div>
        <LogoutIcon
          className="header__button"
          fontSize="large"
          type="button"
          onClick={logout}
          titleAccess="Wyloguj się"
        />
      </div>
    </div>
  );
}

export default Header;

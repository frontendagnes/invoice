import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../assets/utility/StateProvider";
import { auth, signOut } from "../../assets/utility/firebase";
//comonents
import Menu from "../Menu/Menu";
import HeaderRight from "./HeaderRight";
import HeaderLeft from "./HeaderLeft";
function Header() {
  const [{ user }, dispatch] = useStateValue();
  const history = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "ALERT_LOGOUT", item: user?.email });
        dispatch({ type: "GET_COUNT", item: null });
        dispatch({ type: "SET_LOGO", item: null });
        history("/");
      })
      .catch((error) => {
        dispatch({ type: "ALERT__ERROR", item: error.message });
      });
  };

  return (
    <header className="header">
      <HeaderLeft />
      <Menu />
      <HeaderRight user={user} logout={logout} />
    </header>
  );
}

export default Header;

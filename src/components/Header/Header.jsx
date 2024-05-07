import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../assets/utility/StateProvider";
import { auth, signOut } from "../../assets/utility/firebase";
import "./Header.css";
//comonents
import Menu from "../Menu/Menu";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import ViewSelectedYear from "@/components/ViewSelectedYear";
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
      <ViewSelectedYear />
      <HeaderLeft />
      <Menu />
      <HeaderRight user={user} logout={logout} />
    </header>
  );
}

export default Header;

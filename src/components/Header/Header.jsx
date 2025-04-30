import React from "react";
import { useStateValue } from "../../assets/utility/StateProvider";
import useAuth from "../../api/useAuth/useAuth";
import "./Header.css";
//comonents
import Menu from "../Menu/Menu";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import ViewSelectedYear from "@/components/ViewSelectedYear";

function Header() {
  const [{ user }, dispatch] = useStateValue();
  const { logout, loading } = useAuth();

  return (
    <header className="header">
      <div className="header__year">
        <ViewSelectedYear />
      </div>
      <HeaderLeft />
      <Menu />
      <HeaderRight user={user} logout={logout} loading={loading} />
    </header>
  );
}

export default Header;

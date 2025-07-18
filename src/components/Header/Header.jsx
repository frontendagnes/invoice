import "./Header.css";

import { useStateValue } from "../../state/StateProvider";
import useAuth from "../../api/useAuth/useAuth";
//comonents
import Menu from "../Menu/Menu";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import ViewSelectedYear from "../SelectedYear/ViewSelectedYear/index.jsx";

function Header() {
  const [{ user }, dispatch] = useStateValue();
  const { logout, loading } = useAuth();

  return (
    <header className="header">
      {/* <ViewSelectedYear /> */}
      <HeaderLeft />
      <Menu />
      <HeaderRight user={user} logout={logout} loading={loading} />
    </header>
  );
}

export default Header;

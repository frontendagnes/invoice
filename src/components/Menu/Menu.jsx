import React from "react";
import "./Menu.css";

//components
import MenuDeskopt from "./MenuDeskopt";
import MenuMobile from "./MenuMobile";

function Menu() {

  return (
    <nav className="menu">
      <MenuDeskopt />
      <MenuMobile />
    </nav>
  );
}

export default Menu;

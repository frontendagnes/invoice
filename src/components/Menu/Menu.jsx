import React from "react";
import "./Menu.css";

//components
import MenuDeskopt from "./MenuDeskopt";
import MenuMobile from "./MenuMobile";

function Menu() {
  return (
    <div className="menu">
      <MenuDeskopt />
      <MenuMobile />
    </div>
  );
}

export default Menu;

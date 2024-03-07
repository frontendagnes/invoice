import React from "react";
import "./Menu.css";

//components
import ViewSelectedYear from "../ViewSelectedYear";
import MenuDeskopt from "./MenuDeskopt";
import MenuMobile from "./MenuMobile";

function Menu() {
  return (
    <div className="menu">
      {/* <ViewSelectedYear /> */}
      <MenuDeskopt />
      <MenuMobile />
    </div>
  );
}

export default Menu;

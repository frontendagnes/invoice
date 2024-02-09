import React from "react";
import { NavLink } from "react-router-dom";
import { menuItems } from "../items";

const activeStyle = {
  borderTop: "3px solid #a4b0cc",
};
function MenuDeskopt() {
  return (
    <ul className="menu__ul">
      {menuItems.map((item) => (
        <li key={item.id.toString()}>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to={item.href}
          >
            {item.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default MenuDeskopt;

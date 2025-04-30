import React from "react";
import { NavLink } from "react-router-dom";
import { menuItems } from "../items";
import Tooltip from "../../Tooltip/Tooltip.jsx";


const activeStyle = {
  borderTop: "3px solid #a4b0cc",
};

function MenuDeskopt() {
  return (
    <ul className="menu__ul">
      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <li key={item.id.toString()}>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to={item.href}
            >
              {Icon ? (
                <Tooltip text={item.name}>
                  <Icon  style={{ marginRight: "5px"}} />
                </Tooltip>
              ) : (
                item.name
              )}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}

export default MenuDeskopt;

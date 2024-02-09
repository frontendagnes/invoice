import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { menuItems } from "../items";
import MenuIcon from "@mui/icons-material/Menu";

const activeMobielStyle = {
  background: "#3f4d70",
};

function MenuMobile() {
  const [isView, setIsView] = useState(false);

  const changeView = () => {
    setIsView(!isView);
  };
  const handleClick = () => {
    setIsView(false);
  };
  return (
    <div className="menu__mobile">
      <div className="menu__mobileIcon">
        <MenuIcon sx={{ fontSize: "48px" }} onClick={changeView} />
      </div>
      <ul
        className="menu__ulMobile"
        style={{
          transform: isView ? "scaleY(1)" : "scaleY(0)",
        }}
      >
        {menuItems.map((item) => (
          <li key={item.id.toString()} onClick={handleClick}>
            <NavLink
              style={({ isActive }) =>
                isActive ? activeMobielStyle : undefined
              }
              to={item.href}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuMobile;

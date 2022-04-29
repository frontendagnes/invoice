import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";
import MenuIcon from "@mui/icons-material/Menu";
const menuItems = [
  {
    id: 1,
    name: "Dodaj Fakturę",
    href: "/",
  },
  {
    id: 2,
    name: "Przychody/Wyszukaj",
    href: "/invoices",
  },
  {
    id: 3,
    name: "Koszty",
    href: "/costs",
  },
  {
    id: 4,
    name: "Podsumowanie",
    href: "/records",
  },
];

// active links styles
const activeStyle = {
  borderTop: "3px solid #a4b0cc",
};

const activeMobielStyle = {
  background: "#3f4d70",
};

function Menu() {
  const [isView, setIsView] = useState(false);

  const changeView = () => {
    setIsView(!isView);
  };
  const handleClick = () => {
    setIsView(false);
  };
  return (
    <div className="menu">
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
      {/* Mobile version */}
      <div className="menu__mobile">
        <div className="menu__mobileIcon">
          <MenuIcon sx={{ fontSize: "48px" }} onClick={changeView} />
        </div>
          <ul className="menu__ulMobile" style={{
            transform: isView ? "scaleY(1)" : "scaleY(0)",
          }}>
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
    </div>
  );
}

export default Menu;

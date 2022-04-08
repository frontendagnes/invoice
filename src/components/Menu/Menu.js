import React from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";

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

function Menu() {
  return (
    <ul className="menu">
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

export default Menu;

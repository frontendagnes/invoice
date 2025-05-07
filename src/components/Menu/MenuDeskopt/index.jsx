import React, { useState, useRef } from "react";
import { menuItems } from "../items";

import { useLocation } from "react-router-dom";
import { useClickAway } from "react-use";
import { AnimatePresence } from "framer-motion";
//componnents
import MenuItem from "../MenuItem.jsx";
import SubMenu from "../SubMenu/SubMenu.jsx";

const activeClass = "menu__item--deskopt-active"; // Klasa CSS dla aktywnego elementu

function MenuDeskopt() {
  const [activeSubmenuId, setActiveSubmenuId] = useState(null);

  let location = useLocation();

  const handleClose = () => {
    setActiveSubmenuId(null);
  };

  const menuRef = useRef();
  useClickAway(menuRef, handleClose);

  const handleClick = (itemId) => {
    const clickedItem = menuItems.find((item) => item.id === itemId);
    if (clickedItem?.submenu) {
      setActiveSubmenuId(itemId);
    } else {
      setActiveSubmenuId(null);
    }
  };
  const handleOpenCloseSubmenu = (e, item) => {
    if (activeSubmenuId) {
      handleClose();
    } else {
      handleClick(item.id);
    }
  };
  const getActiveClass = (item) => {
    if (item.submenu && activeSubmenuId === item.id) return activeClass;
    if (!item.submenu && location.pathname === item.href) return activeClass;
    if (
      item.submenu &&
      location.pathname.startsWith(item.href) &&
      item.href !== "/"
    )
      return activeClass;
    return "";
  };

  return (
    <div className="menu__wrapper--deskopt" role="menubar" ref={menuRef}>
      {menuItems.map((item) => (
        <div
          key={item.id.toString()}
          className={`menu__item--deskopt ${getActiveClass(item)}`}
        >
          <div
            onClick={(e) => handleOpenCloseSubmenu(e, item)}
            className="menu__wrapper--items"
          >
            <MenuItem
              item={item}
              activeSubmenuId={activeSubmenuId}
              className="menu__item--link"
              onClick={handleClose}
            />
          </div>
          <AnimatePresence>
            {item.submenu && activeSubmenuId === item.id && (
              <SubMenu item={item} handleClick={handleClose} />
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default MenuDeskopt;

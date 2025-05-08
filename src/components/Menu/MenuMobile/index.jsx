import React, { useState, useRef } from "react";
import { menuItems } from "../items";
import { Squash as Hamburger } from "hamburger-react";
import { useClickAway } from "react-use";

import MenuItem from "../MenuItem.jsx";
import SubMenuMobile from "../SubMenu/SubMenuMobile.jsx";
import RotateArrow from "../RotateArrow/RotateArrow.jsx";

function MenuMobile() {
  const [isView, setIsView] = useState(false);
  const [openSubmenuId, setOpenSubmenuId] = useState(null);

  const menuRef = useRef();
  useClickAway(menuRef, () => setIsView(false));

  const toggleSubmenu = (itemId) => {
    const hasSubmenu = menuItems.find((item) => item.id === itemId)?.submenu;
    if (!hasSubmenu) return setIsView(false), setOpenSubmenuId(null);
    setOpenSubmenuId((prev) => (prev === itemId ? null : itemId));
  };

  return (
    <div className="menu__wrapper--mobile" ref={menuRef}>
      <div className="menu__mobileIcon">
        <Hamburger toggled={isView} toggle={setIsView} />
      </div>

      <div
        className="menu__list--mobile"
        style={{
          transform: isView ? "scaleY(1)" : "scaleY(0)",
          transition: "transform 0.3s ease",
        }}
        role="menubar"
      >
        {menuItems.map((item) =>
          item.submenu ? (
            <div key={item.id.toString()}>
              <div
                className="menu__item--mobile"
                onClick={() => toggleSubmenu(item.id)}
              >
                {item.name}
                <RotateArrow activeSubmenuId={openSubmenuId} item={item} />
              </div>
              <SubMenuMobile
                item={item}
                openSubmenuId={openSubmenuId}
                setIsView={setIsView}
              />
            </div>
          ) : (
            <MenuItem
              key={item.id.toString()}
              item={item}
              onClick={() => {
                setIsView(false);
                setOpenSubmenuId(null);
              }}
              className="menu__item--mobile"
              isMobile
            />
          )
        )}
      </div>
    </div>
  );
}

export default MenuMobile;

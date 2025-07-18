import  { useState, useEffect } from "react";
import "./SubMenuMobile.css";
import MenuItem from "../MenuItem";

function SubMenuMobile({ item, openSubmenuId, setIsView }) {
  const [isOpen, setIsOpen] = useState(false);

  // Sprawdzamy, czy submenu jest otwarte
  useEffect(() => {
    if (openSubmenuId === item.id) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [openSubmenuId, item.id]);

  return (
    <div className={`submenu__mobile ${isOpen ? "open" : ""}`}>
      {item.submenu.map((sub) => (
        <div key={sub.id.toString()}>
          <MenuItem
            item={sub}
            onClick={() => setIsView(false)}
            className="submenu__mobile-link"
            link={sub.href}
            isMobile
          />
        </div>
      ))}
    </div>
  );
}

export default SubMenuMobile;

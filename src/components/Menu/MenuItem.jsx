import React from "react";
import { NavLink } from "react-router-dom";
import Tooltip from "../Tooltip/Tooltip.jsx";
import RotateArrow from "./RotateArrow/RotateArrow.jsx";

function MenuItem({
  item,
  onClick,
  className,
  link,
  isMobile,
  activeSubmenuId,
}) {
  const { icon: Icon, name, href, submenu } = item;

  return (
    <NavLink
      to={!submenu ? href : "" || link}
      onClick={onClick}
      className={className}
    >
      {Icon && !isMobile ? (
        <Tooltip text={name} fontSize="12px">
          <div className="menu__icon--wrapper">
            <Icon fontSize="large" />
          </div>
        </Tooltip>
      ) : (
        name
      )}
      {submenu && <RotateArrow activeSubmenuId={activeSubmenuId} item={item} />}
    </NavLink>
  );
}

export default MenuItem;

import React from "react";
import "./Menu.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function RotateArrow({ activeSubmenuId, item }) {
  return (
    <span
      className={`submenu__arrow ${
        activeSubmenuId === item.id ? "rotated" : ""
      }`}
    >
      <ExpandMoreIcon />
    </span>
  );
}

export default RotateArrow;

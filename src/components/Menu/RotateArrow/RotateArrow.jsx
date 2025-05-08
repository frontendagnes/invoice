import React from "react";
import "./RotateArrow.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function RotateArrow({ activeSubmenuId, item }) {
  return (
    <span
      className={`rotatateArrow ${
        activeSubmenuId === item.id ? "rotated" : ""
      }`}
    >
      <ExpandMoreIcon />
    </span>
  );
}

export default RotateArrow;

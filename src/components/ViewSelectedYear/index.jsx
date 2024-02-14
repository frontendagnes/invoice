import React from "react";
import "./ViewSelectedYers.css";
import { useStateValue } from "../../assets/utility/StateProvider";
import { Link } from "react-router-dom";

//mui
import SettingsIcon from "@mui/icons-material/Settings";
function ViewSelectedYear() {
  const [{ selectedYear }, dispatch] = useStateValue();
  return (
    <div className="viewSelectedYear">
      <div>{selectedYear}</div>
      <Link to="/selected-year">
        <SettingsIcon
          sx={{ color: "#808080", cursor: "pointer" }}
          titleAccess="Ustawienia"
        />
      </Link>
    </div>
  );
}

export default ViewSelectedYear;

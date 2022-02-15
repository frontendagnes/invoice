import React from "react";
import "./GoHome.css";
import { useNavigate } from "react-router-dom";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

function GoHome() {
  const history = useNavigate();
  const goHome = () => {
    history("/");  
  };
  return (
    <div className="gohome">
      <AddBusinessIcon
        onClick={goHome}
        sx={{ fontSize: 50 }}
        color="success"
        titleAccess="Dodaj fakturę"
        className="gohome__button"
      />
    </div>
  );
}

export default GoHome;

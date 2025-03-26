import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";

function HeaderRight({ user, logout, loading }) {
  return (
    <div className="header__right">
      <div>Witaj,</div>
      <div>{user?.email}</div>
      <Button
        className="header__logout"
        sx={{ color: "#ffffff", transition: "all 0.75s" }}
        onClick={logout}
        disabled={loading}
      >
        <LogoutIcon fontSize="medium" sx={{ marginRight: "5px" }} />
        {loading ? "Wylogowywanie" : "Wyloguj się"}
      </Button>
    </div>
  );
}

export default HeaderRight;

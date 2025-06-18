import { Link } from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";

function HeaderRight({ user, logout, loading }) {
  return (
    <div className="header__right">
      <div>Witaj,</div>
      <div>
        {user?.email || (
          <Link to="/" className="header__no-logged">
            Zaloguj się
          </Link>
        )}
      </div>
      <div className="header__actions">
        {user && (
          <Button variant="text" onClick={logout} disabled={loading}>
            <LogoutIcon fontSize="small" sx={{ mr: 0.5 }} />
            {loading ? "Wylogowywanie" : "Wyloguj się"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default HeaderRight;

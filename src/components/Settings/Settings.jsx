import React from "react";
import "./Settings.css";
import { NavLink } from "react-router-dom";

function Settings() {
  return (
    <div className="settings">
      <h2 className="settings__title">Ustawienia</h2>
      <div className="settings__links">
        <NavLink to="/settings/contractors" className="settings__link">
          Kontrahenci
        </NavLink>
        <NavLink to="/settings/selected-year" className="settings__link">
          Zarządzaj latami
        </NavLink>
      </div>
    </div>
  );
}

export default Settings;

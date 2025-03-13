import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      &copy;{" "}
      <a
        href={import.meta.env.VITE_APP_MY_URL}
        title={import.meta.env.VITE_APP_MY_URL}
        alt={import.meta.env.VITE_APP_MY_URL}
      >
        frontend-agnes
      </a>
    </footer>
  );
}

export default Footer;

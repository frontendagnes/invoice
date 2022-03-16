import React, { useEffect, useRef, useState } from "react";
import "./Header.css";
import styled from "styled-components";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../../assets/utility/StateProvider";
import { auth } from "../../assets/utility/firebase";
// mui
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Header() {
  const [settingsView, setSettingsView] = useState(false);
  const [isActive, setIsActive] = useState(1);
  const [atrr, setAtrr] = useState(1);
  const [{ user }, dispatch] = useStateValue();
  const history = useNavigate();

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        dispatch({ type: "ALERT_LOGOUT", item: user?.email });
        history("/");
      })
      .catch((error) => {
        dispatch({ type: "ALERT__ERROR", item: error.message });
      });
  };
  const getData = (e) => {
    // let id = e.target.getAttribute("data-number");
    // setIsActive(id);
    const headerUl = document.querySelector(".header__center");
    const liElements = headerUl.querySelectorAll(".header__li");

    liElements.forEach((element) => {
      // console.log(element.dataset.number)
      // if(element.dataset.number === isActive){
      //   element.classList.add("classLi")
      //   console.log(element.dataset.number)
      // }else {
      //   element.classList.remove("classLi")
      // }
    });
    // console.log(id);
    // setAtrr(id);
  };
  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div className="header">
      <div className="header_left">FAKTURKA 2.0</div>
      <ul className="header__center">
        <Link to="/" onClick={getData}>
          <li data-number={1} className="header__li">
            Dodaj Fakturę
          </li>
        </Link>
        <Link to="/invoices" onClick={getData}>
          <li data-number={2} className="header__li">
            Wyszukaj/Zestawienie
          </li>
        </Link>
        <Link to="/records" onClick={getData}>
          <li data-number={3} className="header__li">
            Podsumowanie
          </li>
        </Link>
        <Link to="#" onClick={getData}>
          <li data-number={4} className="header__li" title="Jeszcze nie działa">
            Koszty
          </li>
        </Link>
      </ul>
      <div className="header__right">
        <div
          className="header__user"
          onClick={() => setSettingsView(!settingsView)}
        >
          <div>
            <div>Jestś zalogowany jako,</div>
            <div>{user?.email}</div>
          </div>
          <ExpandMoreIcon fontSize="large" />
        </div>
          <div
            className="header__pulldownMenu"
            style={{
              transform: settingsView ? "scaleX(1)" : "scaleX(0)",
              visibility: settingsView ? "visible" : "hidden",
            }}
          >
            <ul className="header__settingsUl">
              <li onClick={logout}>Wyloguj się</li>
            </ul>
          </div>
      </div>
    </div>
  );
}

export default Header;

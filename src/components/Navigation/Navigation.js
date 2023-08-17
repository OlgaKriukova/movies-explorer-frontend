import { useState } from "react";
import { Link } from "react-router-dom";
import iconMain from "../../images/icon__COLOR_icon-main.svg";
import './Navigation.css';

function Navigation() {
  const [isSidebarActive, setSidebarActive] = useState(false);

  const sidebarClassName = `sidebar ${isSidebarActive ? "sidebar_active" : ""}`;

  function handleButtonBurgerClick(card) {
    setSidebarActive(true);
  }

  function handleButtonBurgerCloseClick(card) {
    setSidebarActive(false);
  }

  return (
    <>
      <div className="header-movies">
        <nav className="nav-tab">
          <Link to="/movies" className="nav-tab__list">
            Фильмы
          </Link>
          <Link to="/saved-movies" className="nav-tab__list">
            Сохраненные фильмы
          </Link>
        </nav>
        <a href="./profile.html" className="nav-tab__list nav-tab__list_active">
          Аккаунт
          <div className="nav-tab__icon"></div>
        </a>
      </div>
      <button type="button" className="heder-burger" onClick={handleButtonBurgerClick}></button>
      <div className={sidebarClassName}>
        <button type="button" className="sidebar__icon" onClick={handleButtonBurgerCloseClick}></button>
        <div className="nav-burger nav-burger_active">
          <Link to="/" className="nav-burger__list">
              Главная
          </Link>
          <Link to="/movies" className="nav-burger__list nav-burger__list_active">
              Фильмы
          </Link>
          <Link to="/saved-movies" className="nav-burger__list">
              Сохраненные фильмы
          </Link>
        </div>
        <Link to="/saved-movies" className="nav-burger__list">
            Аккаунт
            <div className="nav-burger__icon"></div>
        </Link>
      </div>
    </>
  );
}

export default Navigation;

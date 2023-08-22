import { useState } from "react";
import { Link } from "react-router-dom";
import './Navigation.css';

function Navigation(props) {
  const [isSidebarActive, setSidebarActive] = useState(false);

  const sidebarClassName = `sidebar ${isSidebarActive ? "sidebar_active" : ""}`;
  const moviesClassName = `nav-tab__list ${props.headerForm==='Movies' ? "nav-tab__list_active" : ""}`;
  const savedMoviesClassName = `nav-tab__list ${props.headerForm==='SavedMovies' ? "nav-tab__list_active" : ""}`;

  const mainBurgerClassName = `nav-burger__list ${props.headerForm==='Main' ? "nav-burger__list_active" : ""}`;
  const moviesBurgerClassName = `nav-burger__list ${props.headerForm==='Movies' ? "nav-burger__list_active" : ""}`;
  const savedMoviesBurgerClassName = `nav-burger__list ${props.headerForm==='SavedMovies' ? "nav-burger__list_active" : ""}`;

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
          <Link to="/movies" className={moviesClassName}>
            Фильмы
          </Link>
          <Link to="/saved-movies" className={savedMoviesClassName}>
            Сохраненные фильмы
          </Link>
        </nav>
        <Link to="/profile" className="nav-tab__account">
          Аккаунт
          <div className="nav-tab__icon"></div>
        </Link>
      </div>
      <button type="button" className="heder-burger" onClick={handleButtonBurgerClick}></button>
      <div className={sidebarClassName}>
        <button type="button" className="sidebar__icon" onClick={handleButtonBurgerCloseClick}></button>
        <div className="nav-burger nav-burger_active">
          <Link to="/" className={mainBurgerClassName}>
              Главная
          </Link>
          <Link to="/movies" className={moviesBurgerClassName}>
              Фильмы
          </Link>
          <Link to="/saved-movies" className={savedMoviesBurgerClassName}>
              Сохраненные фильмы
          </Link>
        </div>
        <Link to="/profile" className="nav-burger__account">
            Аккаунт
            <div className="nav-burger__icon"></div>
        </Link>
      </div>
    </>
  );
}

export default Navigation;

import { Link } from "react-router-dom";
import './Navigation.css';

function Navigation() {
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
      <div className="heder-burger"></div>
{/*
      <div className="sidebar">

        <div className="sidebar__icon" />
        <div className="nav-burger nav-burger_active">
          <a href="./index.html" className="nav-burger__list">
            Главная
          </a>
          <a
            href="./movies.html"
            className="nav-burger__list nav-burger__list_active"
          >
            Фильмы
          </a>
          <a href="./savedMovies.html" className="nav-burger__list">
            Сохраненные фильмы
          </a>
        </div>
        <a className="nav-burger__list">
          Аккаунт
          <img
            className="nav-burger__icon"
            alt="Аккаунт"
            src={iconMain}
          />
        </a>
      </div> */}
    </>
  );
}

export default Navigation;

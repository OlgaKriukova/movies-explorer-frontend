import { Link } from "react-router-dom";
import iconMain from "../../images/icon__COLOR_icon-main.svg";
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
      <div className="sidebar sidebar_active">
        <div className="sidebar__icon" />
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

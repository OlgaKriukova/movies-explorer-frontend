import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import logo from "../../images/logo.png";
import './Header.css';

function Header(props) {
  const headerClassName = `header ${!(props.isShowButtons||props.isShowNavigation) ? "header-form" : ""}`;
  const headerImgClassName = `${(props.isShowButtons||props.isShowNavigation) && "header__img"}`;

  return (
    <header className={headerClassName}>
        <Link to="/" className="header__logo">
            <img src={logo} alt="смайл" className={headerImgClassName} />
        </Link>

        {props.isShowButtons && (
          <>
            <button className="header__button-registy">
                <Link to="/signup" className="header__link-registry">
                    Регистрация
                </Link>
            </button>
            <button className="header__button-enter">
                <Link to="/signin" className="header__link-enter">
                    Войти
                </Link>
            </button>
          </>)}

        {props.isShowNavigation && (
          <>
          <Navigation/>
          </>
          )}
    </header>
  );
}

export default Header;

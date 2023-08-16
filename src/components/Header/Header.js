import Navigation from "../Navigation/Navigation";
import logo from "../../images/logo.png";
import './Header.css';

function Header(props) {
  const headerClassName = `header ${!(props.isShowButtons||props.isShowNavigation) ? "header-form" : ""}`;
  const headerImgClassName = `${(props.isShowButtons||props.isShowNavigation) && "header__img"}`;

  return (
    <header className={headerClassName}>
        <a href="index.html" className="header__logo">
            <img src={logo} alt="смайл" className={headerImgClassName} />
        </a>

        {props.isShowButtons && (
          <>
            <button className="header__button-registy">
                <a href="./register.html" className="header__link-registry">
                    Регистрация
                </a>
            </button>
            <button className="header__button-enter">
                <a href="./login.html" className="header__link-enter">
                    Войти
                </a>
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

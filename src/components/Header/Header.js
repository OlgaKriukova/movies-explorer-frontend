import { Link, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import logo from "../../images/logo.png";
import './Header.css';

function Header(props) {
  const navigate = useNavigate();
  const headerClassName = `header ${!(props.isShowButtons||props.isShowNavigation) ? "header-form" : ""}`;
  const headerImgClassName = `${(props.isShowButtons||props.isShowNavigation) && "header__img"}`;

	function handleButtonRegisterClick() {
		navigate("/signup", { replace: true });
	}

	function handleButtonLoginClick() {
		navigate("/signin", { replace: true });
	}

  return (
    <header className={headerClassName}>
        <Link to="/" className="header__logo">
            <img src={logo} alt="смайл" className={headerImgClassName} />
        </Link>

        {props.isShowButtons && (
          <>
            <button className="header__button-registy"
                    onClick={handleButtonRegisterClick}
            >
              Регистрация
            </button>
            <button className="header__button-enter"
                    onClick={handleButtonLoginClick}
            >
              Войти
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

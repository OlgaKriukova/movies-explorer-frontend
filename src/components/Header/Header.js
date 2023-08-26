import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import logo from "../../images/logo.png";
import './Header.css';

function Header(props) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const headerClassName = `header ${!(props.isShowButtons) ? "header-form" : ""} ${(props.isBlue) ? "header-blue" : ""}`;
  const headerImgClassName = `${(props.isShowButtons) ? "header__img" : ""}`;

console.log('headerImgClassName '+headerImgClassName);

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

        {(!currentUser.email&&props.isShowButtons) && (
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

        {(currentUser.email&&props.isShowButtons) && (
          <>
            <Navigation
              headerForm={props.headerForm}
            />
          </>
          )}
    </header>
  );
}

export default Header;

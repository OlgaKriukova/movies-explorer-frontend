import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import './Register.css';

function Register() {
  const navigate = useNavigate();

  function handleButtonRegisterClick() {
		navigate("/signin", { replace: true });
	}

  return (
    <>
    <Header/>
        <div className="form">
            <h1 className="title-form">Добро пожаловать!</h1>
            <form className="form__table">
                <div className="form__list">
                    <label className="form__label">
                      Имя
                    </label>
                    <input
                      id="name"
                      className="form__input"
                      type="text"
                      placeholder="Виталий"
                      required={true}
                      minLength={2}
                      maxLength={25}
                      defaultValue=""
                    />
                </div>
                <div className="form__list">
                    <label className="form__label">
                      E-mail
                    </label>
                    <input
                      id="email"
                      className="form__input"
                      type="email"
                      placeholder="pochta@yandex.ru"
                      required={true}
                      minLength={7}
                      maxLength={25}
                    />
                    {/* <span className="form__input-error">Пользователь с таким email уже существует.</span> */}
                </div>
                <div className="form__list">
                    <label className="form__label">
                      Пароль
                    </label>
                    <input
                      id="password"
                      className="form__input-password"
                      type="password"
                      placeholder="••••••••••••••"
                      required={true}
                    />
                    <span className="form__input-error">Что-то пошло не так...</span>
                </div>
            </form>
            <div className="reg">
                {/* <span className="form__input-error">При регистрации пользователя произошла ошибка.</span> */}
                <button className="reg__button"
                  onClick={handleButtonRegisterClick}
                >
                  Зарегистрироваться
                </button>
                <div className="reg__enter">
                    <p className="reg__enter-text">Уже зарегистрированы?</p>
                    <Link to="/signin" className="reg__enter-link">
                      Войти
                    </Link>
                </div>
            </div>
        </div>
    </>
  );
}

export default Register;

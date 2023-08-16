import Header from "../Header/Header";
import './Register.css';

function Register() {
  return (
    <>
        <div className="form">
            <Header/>
            <h1 className="title-form">Добро пожаловать!</h1>
            <form className="form__table">
                <div className="form__list">
                    <label htmlFor="name" className="form__label">
                      Имя
                    </label>
                    <input
                      id="name"
                      className="form__input"
                      type="text"
                      placeholder="Виталий"
                      required=""
                      minLength={2}
                      maxLength={25}
                      defaultValue=""
                    />
                </div>
                <div className="form__list">
                    <label htmlFor="email" className="form__label">
                      E-mail
                    </label>
                    <input
                      id="name"
                      className="form__input"
                      type="email"
                      placeholder="pochta@yandex.ru"
                      required=""
                      minLength={7}
                      maxLength={25}
                    />
                </div>
                <div className="form__list">
                    <label htmlFor="password" className="form__label">
                      Пароль
                    </label>
                    <input
                      id="password"
                      className="form__input-password"
                      type="password"
                      placeholder="••••••••••••••"
                      required=""
                    />
                    <span className="form__input-error">Что-то пошло не так...</span>
                </div>
            </form>
            <div className="reg">
                <button className="reg__button">Зарегистрироваться</button>
                <div className="reg__enter">
                    <p className="reg__enter-text">Уже зарегистрированы?</p>
                    <a href="./movies.html" className="reg__enter-link">
                      Войти
                    </a>
                </div>
            </div>
        </div>
    </>
  );
}

export default Register;

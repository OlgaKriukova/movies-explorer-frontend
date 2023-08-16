import Header from "../Header/Header";
import './Login.css';

export default function Login() {
  return (
	<>
		<div className="form">
			<Header/>
			<h1 className="title-form">Рады видеть!</h1>
			<form className="form__table">
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
				<button className="reg__button">Войти</button>
				<div className="reg__enter">
				<p className="reg__enter-text">Ещё не зарегистрированы?</p>
				<a href="./register.html" className="reg__enter-link">
					Регистрация
				</a>
				</div>
			</div>
		</div>
	  </>
  );
}

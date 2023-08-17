import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import './Login.css';

export default function Login() {
	const navigate = useNavigate();

	function handleButtonLoginClick() {
		navigate("/saved-movies", { replace: true });
	}

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
					<button className="reg__button"
					        onClick={handleButtonLoginClick}
					>
						Войти
					</button>
					<div className="reg__enter">
						<p className="reg__enter-text">Ещё не зарегистрированы?</p>
						<Link to="/signup"  className="reg__enter-link">
							Регистрация
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

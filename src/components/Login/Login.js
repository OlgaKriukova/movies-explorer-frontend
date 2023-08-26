import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import isEmail from 'validator/lib/isEmail';
import Header from "../Header/Header";
import './Login.css';

function Login(props) {
    const navigate = useNavigate();

    const initialValues = {email: '', password: '',};
    const [formValues, setFormValues] = useState(initialValues);
    const [changedValueNames, setChangedValueNames] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [isValid, setValid] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        setValid(Object.keys(formErrors).length === 0
                 && changedValueNames.length === Object.keys(formValues).length);
      }, [formErrors, changedValueNames, formValues]);

    const validate = (values) => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Поле "E-mail" обязательно для заполнения!';
        } else if (!isEmail(values.email)) {
            errors.email = 'Неправильный формат поля "E-mail"!';
        }

        if (!values.password) {
            errors.password = 'Поле "Пароль" обязательно для заполнения!';
        }
        return errors;
    }

    const handleChange = (evt) => {
        const { name, value } = evt.target;

        setFormValues({
            ...formValues,
            [name]: value,
        });

        setFormErrors(validate({
            ...formValues,
            [name]: value,
        }));

        if (!changedValueNames.includes(name)) {
            setChangedValueNames([...changedValueNames, name]);
        }
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        props.signin(formValues)
        .then(() => {
            props.setNeedUpdateUser(true);
            navigate("/movies", { replace: true });
        })
        .catch((err) => {
            if (err === 'Ошибка: 401') {
                setSubmitError(err+' Ошибка авторизации!')
            }
        })
        .finally(() => {
            props.setInRequest(false);
        });
    }

    return (
        <>
            <Header/>
            <div className="form">
                <h1 className="title-form">Рады видеть!</h1>
                <form
                    className="form__table"
                    action="#"
                    name="login__form"
                    tabIndex={0}
                    onSubmit={handleSubmit}
                >
                    <div className="form__list">
                        <label className="form__label">
                            E-mail
                        </label>
                        <input
                            id="email"
                            name="email"
                            className={`form__input${formErrors.email ? " form__input-error" : ""}`}
                            type="text"
                            placeholder="pochta@yandex.ru"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                        <span className="form__error">
                            {changedValueNames.includes('email') ? formErrors.email : ''}
                        </span>
                    </div>
                    <div className="form__list">
                        <label className="form__label">
                            Пароль
                        </label>
                        <input
                            id="password"
                            name="password"
                            className={`form__input${formErrors.password ? " form__input-error" : ""}`}
                            type="password"
                            placeholder="••••••••••••••"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                        <span className="form__error form__error-last">
                            {changedValueNames.includes('password') ? formErrors.password : ''}
                        </span>
                    </div>
                    <div className="reg reg-login">
                        <span className="submit__error">
                            {submitError}
                        </span>
                        <button
                            className = {`reg__button${(!isValid||props.isInRequest) ? " button-disabled" : ""}`}
                            disabled = {!isValid || props.isInRequest}
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
                </form>
            </div>
        </>
    );
}

export default Login;
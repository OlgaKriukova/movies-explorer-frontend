import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import isEmail from 'validator/lib/isEmail';
import Header from "../Header/Header";
import Popup from "../Popup/Popup";
import './Profile.css';

function Profile(props) {
    //const navigate = useNavigate();
    const currentUser = useContext(CurrentUserContext);
    const [formValues, setFormValues] = useState({name:'', email: ''});
    const [changedValueNames, setChangedValueNames] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [isValid, setValid] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [isEditProfile, setEditProfile] = useState(false);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const profFormErrorClassName = `prof-form__error ${isEditProfile ? "prof-form__error_active" : ""}`;
    const profEditExitClassName = `prof__edit-exit ${!isEditProfile ? "prof__edit-exit_active" : ""}`;

    useEffect(() => {
        setFormValues({
            name: currentUser.name ? currentUser.name : '',
            email: currentUser.email ? currentUser.email : ''
        });
    }, [currentUser]);

    function handleButtonEditClick() {
        setEditProfile(true);
    }

    useEffect(() => {
        setValid(Object.keys(formErrors).length === 0
                 &&(currentUser.name!==formValues.name || currentUser.email!==formValues.email));
      }, [formErrors, currentUser, formValues]);

    const validate = (values) => {
        const errors = {};
        const regexName = /^[A-Za-zА-ЯЁа-яё -]+$/i;

        if (!values.name) {
            errors.name = 'Поле "Имя" обязательно для заполнения!';
        } else if (values.name.length < 2) {
            errors.name = 'Поле "Имя" должно быть не менее 2 символов!';
        } else if (values.name.length > 30) {
            errors.name = 'Поле "Имя" должно быть не более 30 символов!';
        } else if (!regexName.test(values.name)) {
            errors.name = 'Поле "Имя" может содержать только латиницу, кириллицу, пробел или дефис!';
        }

        if (!values.email) {
            errors.email = 'Поле "E-mail" обязательно для заполнения!';
        } else if (!isEmail(values.email)) {
            errors.email = 'Неправильный формат поля "E-mail"!';
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

        props.setUserInfo(formValues)
        .then(() => {
            setSubmitError('');
            props.setNeedUpdateUser(true);
            setEditProfile(false);
            setPopupOpen(true);
        })
        .catch((err) => {
            if (err === 'Ошибка: 409') {
                setSubmitError(err+' Нарушена уникальность!')
            }
        })
        .finally(() => {
            props.setInRequest(false);
        });
    }

    const handlePopupClose = () => {
        setPopupOpen(false);
    }

    return (
        <>
            <Header
                isShowButtons={true}
                headerForm={'Profile'}
            />
            <Popup
                infoText = {'Профиль сохранен'}
                isOpen = {isPopupOpen}
                onClose = {handlePopupClose}
            />

            <div className="profile-form">
                <h1 className="title-form-profile">Привет, {currentUser.name}!</h1>
                <form
                    className="profile-form__table"
                    action="#"
                    name="profile-form"
                    tabIndex={0}
                    onSubmit={handleSubmit}
                >
                    <div className="profile-form__wrap">
                        <div className="profile-form__list">
                            <label className="profile-form__label">
                                Имя
                            </label>
                            <input
                                disabled = {!isEditProfile}
                                id="form-input-name"
                                name="name"
                                className={`profile-form__input${formErrors.name ? " profile-form__input-error" : ""}`}
                                type="text"
                                placeholder="Виталий"
                                value={formValues.name}
                                onChange={handleChange}
                            />
                        </div>
                        <span className="form__error profile-form__error">
                            {changedValueNames.includes('name') ? formErrors.name : ''}
                        </span>
                    </div>
                    <div className="profile-form__wrap      ">
                        <div className="profile-form__list">
                            <label className="profile-form__label">
                                E-mail
                            </label>
                            <input
                                disabled = {!isEditProfile}
                                id="form-input-email"
                                name="email"
                                className={`profile-form__input${formErrors.email ? " profile-form__input-error" : ""}`}
                                placeholder="pochta@yandex.ru"
                                value={formValues.email}
                                onChange={handleChange}
                            />
                        </div>
                        <span className="form__error">
                            {changedValueNames.includes('email') ? formErrors.email : ''}
                        </span>
                    </div>

                    <div className="prof">
                        <span className={profFormErrorClassName}>
                            {submitError}
                        </span>
                        <button
                            className = {`prof__button${(!isValid||props.isInRequest) ? " button-disabled" : ""}${isEditProfile ? " prof__button_active" : ""}`}
                            disabled = {!isValid || props.isInRequest}
                        >
                            Сохранить
                        </button>
                        <div className={profEditExitClassName}>
                            <button className='prof__edit'
                                    type="button"
                                    onClick={handleButtonEditClick}
                            >
                                Редактировать
                            </button>
                            <button className="prof__exit"
                                    type="button"
                                    onClick={props.onLogOut}
                            >
                                Выйти из аккаунта
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Profile;

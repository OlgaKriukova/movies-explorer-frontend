import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [isEditProfile, setEditProfile] = useState(false);

  function handleButtonEditClick() {
		setEditProfile(true);
	}

  function handleButtonSaveClick() {
		setEditProfile(false);
	}

  function handleButtonExitClick() {
		navigate("/signin", { replace: true });
	}

  const profButtonSaveClassName = `prof__button ${isEditProfile ? "prof__button_active" : ""}`;
  const profFormErrorClassName = `prof-form__error ${isEditProfile ? "prof-form__error_active" : ""}`;
  const profEditExitClassName = `prof__edit-exit ${!isEditProfile ? "prof__edit-exit_active" : ""}`;

  return (
    <>
        <Header
            isShowNavigation={true}
            headerForm={'Profile'}
        />
        <div className="profile-form">
            <h1 className="title-form-profile">Привет, Виталий!</h1>
            <form className="profile-form__table">
                <div className="profile-form__list">
                    <label className="profile-form__label">
                      Имя
                    </label>
                    <input
                      id="name"
                      className="profile-form__input"
                      type="text"
                      placeholder="Виталий"
                      required={true}
                      minLength={2}
                      maxLength={25}
                      defaultValue=""
                    />
                </div>
                <div className="profile-form__list">
                    <label className="profile-form__label">
                      E-mail
                    </label>
                    <input
                      id="email"
                      className="profile-form__input"
                      type="email"
                      placeholder="pochta@yandex.ru"
                      required={true}
                      minLength={7}
                      maxLength={25}
                    />
                </div>
            </form>
            <div className="prof">
                <span className={profFormErrorClassName}>
                    При обновлении профиля произошла ошибка.
                </span>
                <button className={profButtonSaveClassName}
                        onClick={handleButtonSaveClick}
                >
                    Сохранить
                </button>
                <div className={profEditExitClassName}>
                    <button className='prof__edit'
                            onClick={handleButtonEditClick}
                    >
                        Редактировать
                    </button>
                    <button className="prof__exit"
                            onClick={handleButtonExitClick}
                    >
                        Выйти из аккаунта
                    </button>
                </div>
            </div>
        </div>
    </>
  );
}

export default Profile;

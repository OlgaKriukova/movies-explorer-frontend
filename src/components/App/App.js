import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Route, Routes, Navigate, useNavigate} from "react-router-dom";
import mainApi from "../../utils/MainApi";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import './App.css';

function App() {
    const navigate = useNavigate();
    const [isNeedUpdateUser, setNeedUpdateUser] = useState(false);
    const [isNeedClearUser, setNeedClearUser] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [isInRequest, setInRequest] = useState(false);
    const [savedCards, setSavedCards] = useState([]);


    useEffect(() => {
        mainApi.getUserInfo()
        .then((result) => {
            setCurrentUser(result);
            //Если пользователя удалось получить (кука была сохранена и актуальна)
            //Получим список его сохраненных фильмов
            return mainApi.getMovies();
        })
        .then((result) => {
            setSavedCards(result);
        })
        .catch((err) => {
            console.log("Нет текущего пользователя");
            localStorage.removeItem('cards');
        });
    }, []);

    useEffect(() => {
/*
        if (email) {
            //Promise.all([mainApi.getUserInfo(), mainApi.getInitialCards()])
            Promise.all([mainApi.getUserInfo()])
                //.then(([user, cards]) => {
                .then(([user]) => {
                    console.log('setCurrentUser');
                    console.log(user);
                    setCurrentUser(user)
                    //setCards(cards)
                })
                .catch((err) => {
                    console.log("get intitial data - catch - " + err);
                });
        } else {
            setCurrentUser({})
            console.log("user logged off");
        }
*/
        if (isNeedUpdateUser) {
            setNeedUpdateUser(false);
            setInRequest(true);
            Promise.all([mainApi.getUserInfo()])
            .then(([user]) => {
                setCurrentUser(user);
            })
            .catch((err) => {
                console.log("get intitial data - catch - " + err);
            })
            .finally(() => {
                setInRequest(false);
            });
        }

        if (isNeedClearUser) {
            setCurrentUser({})
            setNeedClearUser(false);
            console.log("user logged off");
        }

    }, [isNeedUpdateUser,isNeedClearUser]);

    function handleLogOut() {
        mainApi.signout()
        .then(() => {
            setNeedClearUser(true);
            localStorage.removeItem('cards');
            navigate("/", { replace: true });
          })
        .catch((err) => {
            console.log("Logout signout Error -" + err);
        });
    }

    function handleCardLike(movie) {
        console.log("likeCard");

        mainApi
          .createMovie(movie)
          .then((movie) => {
            setSavedCards([...savedCards, movie]);
          })
          .catch((err) => {
            console.log("api.likeCard - catch - " + err);
          });
      }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container fonts">
                <Routes>
                    <Route
                        path="/"
                        element={<Main/>}
                    />
                    <Route
                        path="/signin"
                        element={<Login
                            signin = {mainApi.signin}
                            setNeedUpdateUser = {setNeedUpdateUser}
                            isInRequest = {isInRequest}
                            setInRequest = {setInRequest}
                        />}
                    />
                    <Route
                        path="/signup"
                        element={<Register
                            signup = {mainApi.signup}
                            signin = {mainApi.signin}
                            setNeedUpdateUser = {setNeedUpdateUser}
                            isInRequest = {isInRequest}
                            setInRequest = {setInRequest}
                        />}
                    />
                    <Route
                        path="/movies"
                        element={<Movies
                            isInRequest = {isInRequest}
                            setInRequest = {setInRequest}
                            savedCards = {savedCards}
                            setSavedCards = {setSavedCards}
                            onCardLike = {handleCardLike}
                        />}
                    />
                    <Route
                        path="/saved-movies"
                        element={<SavedMovies
                            isInRequest = {isInRequest}
                            setInRequest = {setInRequest}
                            savedCards = {savedCards}
                            setSavedCards = {setSavedCards}
                        />}
                    />
                    <Route
                        path="/profile"
                        element={<Profile
                            setUserInfo = {mainApi.setUserInfo}
                            setNeedUpdateUser = {setNeedUpdateUser}
                            onLogOut = {handleLogOut}
                            //onUpdateUser = {handleUpdateUser}
                            isInRequest = {isInRequest}
                            setInRequest = {setInRequest}
                        />}
                    />
                    <Route
                        path="*"
                        element={<NotFound/>}
                    />
                </Routes>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

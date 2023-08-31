import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import mainApi from "../../utils/MainApi";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Popup from "../Popup/Popup";

import './App.css';

function App() {
    const navigate = useNavigate();
    const [isNeedUpdateUser, setNeedUpdateUser] = useState(false);
    const [isNeedClearUser, setNeedClearUser] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [isInRequest, setInRequest] = useState(false);
    const [savedMovies, setSavedMovies] = useState([]);
    const [popupText, setPopupText] = useState('');
    const [isAppMounted, setAppMounted] = useState(false);

    useEffect(() => {
        setInRequest(true);
        mainApi.getUserInfo()
        .then((result) => {
            setCurrentUser(result);
            //Если пользователя удалось получить (кука была сохранена и актуальна)
            //Получим список его сохраненных фильмов
            return mainApi.getMovies();
        })
        .then((result) => {
            setSavedMovies(result);
        })
        .catch((err) => {
            if (err ==='Ошибка: 401') {
                console.log("Нет текущего пользователя "+ err);
            } else {
                setPopupText(err);
            }
            localStorage.removeItem('movies');
            localStorage.removeItem('filterValues');
        })
        .finally(()=> {
            setInRequest(false);
            setAppMounted(true);
        });
    }, []);

    useEffect(() => {
        if (isNeedUpdateUser&&isAppMounted) {
            setNeedUpdateUser(false);
            setInRequest(true);
            mainApi.getUserInfo()
            .then((user) => {
                setCurrentUser(user);
                return mainApi.getMovies();
            })
            .then((result) => {
                setSavedMovies(result);
                navigate("/movies", { replace: true });
            })
            .catch((err) => {
                console.log("get intitial data - catch - " + err);
            })
            .finally(() => {
                setInRequest(false);
            });
        }

        if (isNeedClearUser&&isAppMounted) {
            setCurrentUser({})
            setNeedClearUser(false);
            console.log("user logged off");
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isNeedUpdateUser,isNeedClearUser]);

    function handleLogOut() {
        setInRequest(true);
        mainApi.signout()
        .then(() => {
            setNeedClearUser(true);
            localStorage.removeItem('movies');
            localStorage.removeItem('filterValues');
            navigate("/", { replace: true });
          })
        .catch((err) => {
            console.log("Logout signout Error -" + err);
        }).finally(()=> {
            setInRequest(false);
        });
    }

    function handleMovieLike(movie) {
        console.log("likeMovie movie.id = "+movie.movieId);

        let savedMovieIdx = savedMovies.findIndex(item => item.movieId === movie.movieId);
        console.log('savedMovieIdx = '+savedMovieIdx);

        if (savedMovieIdx>-1) {
            setInRequest(true);
            mainApi
                .deleteMovie(savedMovies[savedMovieIdx])
                .then((deletedMovie) => {
                    setSavedMovies(savedMovies.filter(item => item._id !== deletedMovie._id));
                })
                .catch((err) => {
                    console.log("api.likeMovie - catch - " + err);
                }).finally(()=> {
                    setInRequest(false);
                });
        } else {
            setInRequest(true);
            mainApi
                .createMovie(movie)
                .then((savedMovie) => {
                    setSavedMovies([...savedMovies, savedMovie]);
                })
                .catch((err) => {
                    console.log("api.likeMovie - catch - " + err);
                }).finally(()=> {
                    setInRequest(false);
                });
        }
    }

    function handleMovieDelete(movie) {
        setInRequest(true);
        mainApi
            .deleteMovie(movie)
            .then((deletedMovie) => {
                setSavedMovies(savedMovies.filter(item => item._id !== deletedMovie._id));
            })
            .catch((err) => {
                console.log("api.deleteMovie - catch - " + err);
            }).finally(()=> {
                setInRequest(false);
            });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container fonts">
                <Popup
                    infoText = {popupText}
                    onClose = {() => {setPopupText('')}}
                />
                <Routes>
                    <Route
                        path="/"
                        element={<Main/>}
                    />
                    <Route
                        path="/signin"
                        element={<ProtectedRoute
                            isAppMounted = {isAppMounted}
                            isRegistered = {currentUser?.email ? false : true}
                            element={Login}
                            signin = {mainApi.signin}
                            setNeedUpdateUser = {setNeedUpdateUser}
                            isInRequest = {isInRequest}
                            setInRequest = {setInRequest}
                        />}
                    />
                    <Route
                        path="/signup"
                        element={<ProtectedRoute
                            isAppMounted = {isAppMounted}
                            isRegistered = {currentUser?.email ? false : true}
                            element={Register}
                            signup = {mainApi.signup}
                            signin = {mainApi.signin}
                            setNeedUpdateUser = {setNeedUpdateUser}
                            isInRequest = {isInRequest}
                            setInRequest = {setInRequest}
                        />}
                    />
                    <Route
                        path="/movies"
                        element={<ProtectedRoute
                            element={Movies}
                            isAppMounted = {isAppMounted}
                            isRegistered = {currentUser?.email ? true : false}
                            isInRequest = {isInRequest}
                            setInRequest = {setInRequest}
                            savedMovies = {savedMovies}
                            onMovieLike = {handleMovieLike}
                            setPopupText = {setPopupText}
                            state={currentUser}
                        />
                        }
                    />
                    <Route
                        path="/saved-movies"
                        element={<ProtectedRoute
                            element={SavedMovies}
                            isAppMounted = {isAppMounted}
                            isRegistered = {currentUser?.email ? true : false}
                            isInRequest = {isInRequest}
                            setInRequest = {setInRequest}
                            savedMovies = {savedMovies}
                            onMovieDelete = {handleMovieDelete}
                            setPopupText = {setPopupText}
                        />}
                    />
                    <Route
                        path="/profile"
                        element={<ProtectedRoute
                            element={Profile}
                            isAppMounted = {isAppMounted}
                            isRegistered = {currentUser?.email ? true : false}
                            setUserInfo = {mainApi.setUserInfo}
                            setNeedUpdateUser = {setNeedUpdateUser}
                            onLogOut = {handleLogOut}
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

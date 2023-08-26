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

    useEffect(() => {
        mainApi.getUserInfo()
        .then((result) => {
            setCurrentUser(result);
        })
        .catch((err) => {
            console.log("getUserInfo - catch - " + err);
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
            navigate("/", { replace: true });
          })
        .catch((err) => {
            console.log("Logout signout Error -" + err);
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
                        element={<Movies/>}
                    />
                    <Route
                        path="/saved-movies"
                        element={<SavedMovies/>}
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

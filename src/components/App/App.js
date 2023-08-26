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
    const [email, setEmail] = useState("");
    const [currentUser, setCurrentUser] = useState({});
    const [isInRequest, setInRequest] = useState(false);

    useEffect(() => {
        mainApi.getUserInfo()
        .then((result) => {
            setEmail(result.email);
            //navigate("/", { replace: true });
        })
        .catch((err) => {
            console.log("getUserInfo - catch - " + err);
        });
    }, []);

    useEffect(() => {
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
    }, [email]);

    function handleLoginSubmit(email, password) {
        if (!email || !password) {
          console.log("Login - Error - No login data");
          return;
        }

        mainApi.signin(email, password)
          .then(() => {
            console.log('setEmail(email) '+email);
            setEmail(email);
            navigate("/movies", { replace: true });
          })
          .catch((err) => {

            /*
            setInfoTooltipData({
              isSuccess: false,
            });
            setInfoTooltipOpen(true);
            console.log("Login signin Error -" + err);
            */
          });
      }

    function handleUpdateUser(userInfo) {
        //setisLoading(true);
        mainApi.setUserInfo(userInfo)
        .then((result) => {
            console.log("api.setUserInfo - then - " + result);
            setCurrentUser(result);
        })
        .catch((err) => {
            console.log("api.setUserInfo - catch - " + err);
        })
        .finally(() => {
            //setisLoading(false);
        });
    }

    function handleLogOut() {
        mainApi.signout()
        .then(() => {
            setEmail('');
            navigate("/", { replace: true });
          })
        .catch((err) => {
            // setInfoTooltipData({
            //   isSuccess: false,
            // });
            // setInfoTooltipOpen(true);
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
                            setEmail = {setEmail}
                            isInRequest = {isInRequest}
                            setInRequest = {setInRequest}
                        />}
                    />
                    <Route
                        path="/signup"
                        element={<Register
                            signup = {mainApi.signup}
                            signin = {mainApi.signin}
                            setEmail = {setEmail}
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
                            setEmail = {setEmail}
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

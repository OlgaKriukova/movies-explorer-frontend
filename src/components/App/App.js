import { Route, Routes } from "react-router-dom";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import './App.css';

function App() {

  return (
    <div className="page">
      <div className="page__container fonts">
        <Routes>
          <Route
              path="/"
              element={<Main/>}
          />
          <Route
              path="/signin"
              element={<Login/>}
          />
          <Route
              path="/signup"
              element={<Register/>}
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
              element={<Profile/>}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import mainApi from "../../utils/MainApi";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './SavedMovies.css';

function SavedMovies() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([mainApi.getMovies()])
        .then(([cards]) => {
            setCards(cards);
        })
        .catch((err) => {
            console.log("get intitial data - catch - " + err);
        });
    }, []);

    return (
        <>
        <Header
                isShowButtons={true}
                headerForm={'SavedMovies'}
            />
        <main>
            <SearchForm />
            <MoviesCardList
                source={"saved"}
                cards={cards}
            />
        </main>
        <Footer/>
        </>
    );
}

export default SavedMovies;

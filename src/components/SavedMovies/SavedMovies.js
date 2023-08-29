import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './SavedMovies.css';

function SavedMovies(props) {
    const [filteredMovies, setFilteredMovies] = useState([]);

    function filterMovies ({text, isShortMovie}, moviesForFilter) {
        props.setPopupText('');
        const filteredMovieslocal = moviesForFilter.filter(item => {
            if (isShortMovie && item.duration > 40) {
                return false;
            }
            if (text.length === 0) {
                return true;
            } else if (item.nameRU.toUpperCase().includes(text.toUpperCase()) || item.nameEN.toUpperCase().includes(text.toUpperCase())){
                return true;
            }

            return false;
        });

        if (filteredMovieslocal.length === 0) {
            props.setPopupText('Ничего не найдено');
        }
        setFilteredMovies(filteredMovieslocal);
    }

    const handleFindClick = (values) => {
        filterMovies(values, props.savedMovies);
    }

    useEffect(() => {
        filterMovies({text: '', isShortMovie: false}, props.savedMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.savedMovies]);

    return (
        <>
            <Header
                isShowButtons={true}
                headerForm={'SavedMovies'}
            />
        <main>
            <SearchForm
                    onSubmit = {handleFindClick}
                    isUseSavedFilterValues = {false}
                    isFinded = {true}
            />
            <MoviesCardList
                source={"saved"}
                movies={filteredMovies}
                onMovieDelete={props.onMovieDelete}
            />
        </main>
        <Footer/>
        </>
    );
}

export default SavedMovies;

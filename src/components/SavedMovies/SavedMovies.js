import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './SavedMovies.css';

function SavedMovies(props) {
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [filterValues, setFilterValues] = useState({text: '', isShortMovie: false});
    const [isReadyToFilter, setReadyToFilter] = useState(false);

    const handleFindClick = (values) => {
        setFilterValues({text: values.text, isShortMovie: values.isShortMovie});
        setReadyToFilter(true);
    }

    function filterMovies (values) {
        setFilteredMovies(props.savedMovies.filter(item => {
            if (filterValues.isShortMovie && item.duration > 40) {
                return false;
            }
            if (filterValues.text.length === 0) {
                return true;
            } else if (item.nameRU.toUpperCase().includes(filterValues.text.toUpperCase()) || item.nameEN.toUpperCase().includes(filterValues.text.toUpperCase())){
                return true;
            }

            return false;
        }));

        setReadyToFilter(false);
    }

    useEffect(() => {
        if (isReadyToFilter) {
            filterMovies();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReadyToFilter]);

    useEffect(() => {
        setReadyToFilter(true);
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
                    filterValues = {filterValues}
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

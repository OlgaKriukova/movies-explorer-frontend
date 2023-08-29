import { useState, useEffect } from "react";
import moviesApi from "../../utils/MoviesApi";
import {getSavedfilterValues} from "../../utils/util";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Popup from "../Popup/Popup";
import './Movies.css';

function Movies(props) {
    const RES_FOUR = 1280;
    const RES_THREE = 990;
    const RES_TWO = 620;

    const CARD_ROW_COUNT_FOUR = 4;
    const CARD_ROW_COUNT_THREE = 3;
    const CARD_ROW_COUNT_TWO = 2;
    const CARD_ROW_COUNT_ONE = 1;

    const CARD_ROW_ADD_FOUR = 4;
    const CARD_ROW_ADD_THREE = 3;
    const CARD_ROW_ADD_TWO = 2;
    const CARD_ROW_ADD_ONE = 2;

    const INITIAL_CARD_COUNT_FOUR = 16;
    const INITIAL_CARD_COUNT_THREE = 12;
    const INITIAL_CARD_COUNT_TWO = 8;
    const INITIAL_CARD_COUNT_ONE = 5;

    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [clientWidth, setClientWidth] = useState(document.documentElement.clientWidth);
    const [countLoadedMovies, setCountLoadedMovies] = useState(0);
    const [countVisibleMovies, setCountVisibleMovies] = useState(0);
    const [countAddMovies, setCountAddMovies] = useState(0);
    const [isShowPreloader, setShowPreloader] = useState(false);
    const [isFinded, setFinded] = useState(false);

    const handleResize = () => {
        setTimeout(()=>{setClientWidth(document.documentElement.clientWidth)}, 1000);
    }

    function filterMovies ({text, isShortMovie}, moviesForFilter) {
        setCountVisibleMovies(0);
        setCountLoadedMovies(0);

        const filteredMovieslocal = moviesForFilter.filter(item => {
            props.setPopupText('');
            localStorage.setItem('filterValues', JSON.stringify({text, isShortMovie}));
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
        } else if (!isFinded) {
            setFinded(true);
        }
        setFilteredMovies(filteredMovieslocal);
    }

    function loadMovies() {
        if (movies.length === 0) {
            const localMovies = JSON.parse(localStorage.getItem('movies'));

            if (localMovies) {
                setMovies(localMovies);
                filterMovies(getSavedfilterValues(),localMovies);
            }
            else {
                props.setInRequest(true);
                setShowPreloader(true);
                moviesApi.getMovies()
                .then((resultMovies) => {
                    const remoteMovies = resultMovies.map((resulMovie) => {
                        const movie = {}
                        movie.country = resulMovie.country;
                        movie.director = resulMovie.director;
                        movie.duration = resulMovie.duration;
                        movie.year = resulMovie.year;
                        movie.description = resulMovie.description;
                        movie.image = moviesApi.baseUrl+resulMovie.image.url;
                        movie.trailerLink = resulMovie.trailerLink;
                        movie.thumbnail = moviesApi.baseUrl+resulMovie.image.formats.thumbnail.url;
                        movie.nameRU = resulMovie.nameRU;
                        movie.nameEN = resulMovie.nameEN;
                        movie.movieId = resulMovie.id;
                        return movie;
                    })
                    setMovies(remoteMovies);
                    localStorage.setItem('movies', JSON.stringify(remoteMovies));
                    filterMovies(getSavedfilterValues(),remoteMovies);
                })
                .catch((err) => {
                    props.setPopupText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
                })
                .finally(() => {
                    props.setInRequest(false);
                    setShowPreloader(false);
                });
            }
        } else {
            filterMovies(getSavedfilterValues(), movies);
        }
    }

    const handleFindClick = (values) => {
        if (movies.length === 0) {
            localStorage.setItem('filterValues', JSON.stringify(values));
            loadMovies();
        } else {
            filterMovies(values, movies);
        }
    }

    const handleMoreClick = () => {
        setCountLoadedMovies(countVisibleMovies+countAddMovies);
    }

    useEffect(() => {
        let countRows = 0;
        let countInitialMovies = 0;
        if (clientWidth >= RES_FOUR) {
            countRows = CARD_ROW_COUNT_FOUR;
            countInitialMovies = INITIAL_CARD_COUNT_FOUR;
            setCountAddMovies(CARD_ROW_ADD_FOUR);
        } else if (clientWidth >= RES_THREE) {
            countRows = CARD_ROW_COUNT_THREE;
            countInitialMovies = INITIAL_CARD_COUNT_THREE;
            setCountAddMovies(CARD_ROW_ADD_THREE);
        } else if (clientWidth >= RES_TWO) {
            countRows = CARD_ROW_COUNT_TWO;
            countInitialMovies = INITIAL_CARD_COUNT_TWO;
            setCountAddMovies(CARD_ROW_ADD_TWO);
        } else {
            countRows = CARD_ROW_COUNT_ONE;
            countInitialMovies = INITIAL_CARD_COUNT_ONE;
            setCountAddMovies(CARD_ROW_ADD_ONE);
        }

        if (countLoadedMovies ===0 ) {
            setCountVisibleMovies(0);
        } else if (countLoadedMovies < countInitialMovies) {
            setCountVisibleMovies(countInitialMovies);
        } else {
            setCountVisibleMovies(Math.floor(countLoadedMovies / countRows) * countRows);
        }
    }, [clientWidth, countLoadedMovies]);

    useEffect(() => {
        setCountLoadedMovies(countVisibleMovies+countAddMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredMovies]);

    useEffect(() => {
        const savedFilterValues = JSON.parse(localStorage.getItem('filterValues'));
        if (savedFilterValues) {
           loadMovies();
        }
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Header
                isShowButtons={true}
                headerForm={'Movies'}
            />
            <main>
                <SearchForm
                    onSubmit = {handleFindClick}
                    isUseSavedFilterValues = {true}
                    isFinded = {isFinded}
                />
                <Preloader
                    isShowPreloader = {isShowPreloader}
                />
                <MoviesCardList
                    source={'remote'}
                    movies={filteredMovies}
                    savedMovies={props.savedMovies}
                    countVisibleMovies={countVisibleMovies}
                    onMovieLike={props.onMovieLike}
                />

                <div className="more">
                    <button
                        className={`more__button${(filteredMovies.length === 0 || filteredMovies.length <= countVisibleMovies)? " more__button-none" : ""}`}
                        onClick={handleMoreClick}
                    >
                        Еще
                    </button>
                </div>
            </main>
            <Footer/>
        </>
    );
}

export default Movies;

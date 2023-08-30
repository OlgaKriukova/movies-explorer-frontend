import { useState, useEffect } from "react";
import moviesApi from "../../utils/MoviesApi";
import {getSavedfilterValues} from "../../utils/util";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
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
    const [clientWidthStated, setClientWidthStated] = useState(0);
    const [countVisibleMoviesStated, setCountVisibleMoviesStated] = useState(0);
    const [isShowPreloader, setShowPreloader] = useState(false);
    const [isFinded, setFinded] = useState(false);
    const [isMount, setMount] = useState('');

    let clientWidth = 0;

    function setClientWidth(width) {
        if (width!==clientWidth) {
            clientWidth = width;
            setClientWidthStated(width);
        }
    }

    function setCountVisibleMovies(count) {
        if (isMount) {
            setCountVisibleMoviesStated(count);
            localStorage.setItem('countVisibleMovies', JSON.stringify({count}));
        }
    }

    const handleResize = () => {
        setTimeout(()=>{setClientWidth(document.documentElement.clientWidth)}, 1000);
    }

    function getCountRows(currentWidth) {
        let countRows  = CARD_ROW_COUNT_ONE;

        if (currentWidth >= RES_FOUR) {
            countRows = CARD_ROW_COUNT_FOUR;
        } else if (currentWidth >= RES_THREE) {
            countRows = CARD_ROW_COUNT_THREE;
        } else if (currentWidth >= RES_TWO) {
            countRows = CARD_ROW_COUNT_TWO;
        }

        return countRows;
    }

    function getCountInitialMovies(currentWidth) {
        const countRows = getCountRows(currentWidth);
        let count = INITIAL_CARD_COUNT_ONE;

        if (countRows === 4) {
            count = INITIAL_CARD_COUNT_FOUR;
        } else if (countRows === 3) {
            count = INITIAL_CARD_COUNT_THREE;
        } else if (countRows === 2) {
            count = INITIAL_CARD_COUNT_TWO;
        }
        return count;
    }

    function getCountAddMovies(currentWidth) {
        const countRows = getCountRows(currentWidth);

        if (countRows === 4) {
            return CARD_ROW_ADD_FOUR;
        } else if (countRows === 3) {
            return CARD_ROW_ADD_THREE;
        } else if (countRows === 2) {
            return CARD_ROW_ADD_TWO;
        }
        return CARD_ROW_ADD_ONE;
    }

    function getCountVisibleMovies(currentWidth) {
        let count = 0;
        if (countVisibleMoviesStated === 0) {
            count = getCountInitialMovies(currentWidth);
        } else {
            count = Math.floor(countVisibleMoviesStated / getCountRows(currentWidth)) * getCountRows(currentWidth);
        }

        if (count < getCountInitialMovies(currentWidth)) {
            count = getCountInitialMovies(currentWidth);
        }
        return count;
    }

    function filterMovies ({text, isShortMovie}, moviesForFilter) {
        const count = getCountInitialMovies(document.documentElement.clientWidth);
        setCountVisibleMovies(count);

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

    function handleMoreClick() {
        const count = countVisibleMoviesStated+getCountAddMovies(document.documentElement.clientWidth);
        setCountVisibleMovies(count);
    }

    useEffect(() => {
        if (isMount) {
            setCountVisibleMovies(getCountVisibleMovies(document.documentElement.clientWidth));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientWidthStated]);

    useEffect(() => {
        const savedFilterValues = JSON.parse(localStorage.getItem('filterValues'));
        if (savedFilterValues) {
            loadMovies();
        }
        window.addEventListener('resize', handleResize);

        const countVisibleMovies= JSON.parse(localStorage.getItem('countVisibleMovies'));
        if (countVisibleMovies) {
            setCountVisibleMoviesStated(countVisibleMovies.count);
        } else {
            setCountVisibleMoviesStated(getCountInitialMovies(document.documentElement.clientWidth));
        }

        setClientWidth(document.documentElement.clientWidth);
        setMount(true);

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
                    countVisibleMovies={countVisibleMoviesStated}
                    onMovieLike={props.onMovieLike}
                />

                <div className="more">
                    <button
                        className={`more__button${(filteredMovies.length === 0 || filteredMovies.length <= countVisibleMoviesStated)? " more__button-none" : ""}`}
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

import { useState, useEffect } from "react";
import moviesApi from "../../utils/MoviesApi";
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
    const [isReadyToFilter, setReadyToFilter] = useState(false);
    const [filterValues, setFilterValues] = useState({text: '', isShortMovie: false});
    const [popupText, setPopupText] = useState('');
    const [isShowPreloader, setShowPreloader] = useState(false);

    const handleResize = () => {
        setTimeout(()=>{setClientWidth(document.documentElement.clientWidth)}, 1000);
    }

    useEffect(() => {
        const savedFilterValues = JSON.parse(localStorage.getItem('filterValues'));
        if (savedFilterValues) {
           setFilterValues(savedFilterValues);
           loadMovies();
        }
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    function loadMovies() {
        if (movies.length === 0) {
            const localMovies = JSON.parse(localStorage.getItem('movies'));

            if (localMovies) {
                setMovies(localMovies);
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
                })
                .catch((err) => {
                    setPopupText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
                })
                .finally(() => {
                    props.setInRequest(false);
                    setShowPreloader(false);
                });
            }
        }
    }

    const filterMovies = () => {
        setCountVisibleMovies(0);
        setCountLoadedMovies(0);
        if (isReadyToFilter) {
            const fMovies = movies.filter(item => {
                localStorage.setItem("filterValues", JSON.stringify(filterValues));
                if (filterValues.isShortMovie && item.duration > 40) {
                    return false;
                }
                if (filterValues.text.length === 0) {
                    return true;
                } else if (item.nameRU.toUpperCase().includes(filterValues.text.toUpperCase()) || item.nameEN.toUpperCase().includes(filterValues.text.toUpperCase())){
                    return true;
                }

                return false;
            });

            if (fMovies.length === 0) {
                setPopupText('Ничего не найдено');
            }
            setFilteredMovies(fMovies);

            setReadyToFilter(false);
        }
    }

    const handleFindClick = (values) => {
        if (movies.length === 0) {
            loadMovies();
        }

        setFilterValues(values);
        setReadyToFilter(true);
    }

    const handleMoreClick = () => {
        setCountLoadedMovies(countVisibleMovies+countAddMovies);
    }

    useEffect(() => {
        setReadyToFilter(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movies]);

    useEffect(() => {
        if (isReadyToFilter) {
            filterMovies();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReadyToFilter]);

    useEffect(() => {
        setCountLoadedMovies(countVisibleMovies+countAddMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredMovies]);

    return (
        <>
            <Header
                isShowButtons={true}
                headerForm={'Movies'}
            />
            <main>
                <SearchForm
                    onSubmit = {handleFindClick}
                    filterValues = {filterValues}
                />
                <Preloader
                    isShowPreloader = {isShowPreloader}
                />
                <Popup
                    infoText = {popupText}
                    onClose = {() => {setPopupText('')}}
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

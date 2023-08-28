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

    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [clientWidth, setClientWidth] = useState(document.documentElement.clientWidth);
    const [countLoadedCards, setCountLoadedCards] = useState(0);
    const [countVisibleCards, setCountVisibleCards] = useState(0);
    const [countAddCards, setCountAddCards] = useState(0);
    const [isReadyToFilter, setReadyToFilter] = useState(false);
    const [filterValues, setFilterValues] = useState({text: '', isShortMovie: false});
    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleResize = () => {
        setTimeout(()=>{setClientWidth(document.documentElement.clientWidth)}, 1000);
    }

    useEffect(() => {
        const savedFilterValues = JSON.parse(localStorage.getItem('filterValues'));
        if (savedFilterValues) {
           setFilterValues(savedFilterValues);
           loadCards();
        }
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        let countRows = 0;
        let countInitialCards = 0;
        if (clientWidth >= RES_FOUR) {
            countRows = CARD_ROW_COUNT_FOUR;
            countInitialCards = INITIAL_CARD_COUNT_FOUR;
            setCountAddCards(CARD_ROW_ADD_FOUR);
        } else if (clientWidth >= RES_THREE) {
            countRows = CARD_ROW_COUNT_THREE;
            countInitialCards = INITIAL_CARD_COUNT_THREE;
            setCountAddCards(CARD_ROW_ADD_THREE);
        } else if (clientWidth >= RES_TWO) {
            countRows = CARD_ROW_COUNT_TWO;
            countInitialCards = INITIAL_CARD_COUNT_TWO;
            setCountAddCards(CARD_ROW_ADD_TWO);
        } else {
            countRows = CARD_ROW_COUNT_ONE;
            countInitialCards = INITIAL_CARD_COUNT_ONE;
            setCountAddCards(CARD_ROW_ADD_ONE);
        }

        if (countLoadedCards ===0 ) {
            setCountVisibleCards(0);
        } else if (countLoadedCards < countInitialCards) {
            setCountVisibleCards(countInitialCards);
        } else {
            setCountVisibleCards(Math.floor(countLoadedCards / countRows) * countRows);
        }
    }, [clientWidth, countLoadedCards]);

    function loadCards() {
        if (cards.length === 0) {
            const localCards = JSON.parse(localStorage.getItem('cards'));

            if (localCards) {
                console.log('localCards');
                setCards(localCards);
            }
            else {
                console.log('isInRequest');
                props.setInRequest(true);
                Promise.all([moviesApi.getMovies()])
                .then(([movies]) => {
                    const remoteCards = movies.map((movie) => {
                        const card = {}
                        card.country = movie.country;
                        card.director = movie.director;
                        card.duration = movie.duration;
                        card.year = movie.year;
                        card.description = movie.description;
                        card.image = moviesApi.baseUrl+movie.image.url;
                        card.trailerLink = movie.trailerLink;
                        card.thumbnail = moviesApi.baseUrl+movie.image.formats.thumbnail.url;
                        card.nameRU = movie.nameRU;
                        card.nameEN = movie.nameEN;
                        card.movieId = movie.id;
                        return card;
                    })
                    console.log('remoteCards');
                    setCards(remoteCards);
                    localStorage.setItem("cards", JSON.stringify(remoteCards));
                })
                .catch((err) => {
                    setPopupOpen(true);
                    console.log("get intitial data - catch - " + err);
                })
                .finally(() => {
                    console.log('isInRequest false');
                    props.setInRequest(false);
                });
            }
        }
    }

    const filterCards = () => {
        setFilteredCards(cards.filter(item => {
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
        }));

        setReadyToFilter(false);
    }

    const handleFindClick = (values) => {
        if (cards.length === 0) {
            loadCards();
        }

        setFilterValues(values);
        setReadyToFilter(true);
    }

    const handleMoreClick = (evt) => {
        console.log('more');
        setCountLoadedCards(countVisibleCards+countAddCards);
    }

    useEffect(() => {
        setReadyToFilter(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cards]);

    useEffect(() => {
        if (isReadyToFilter) {
            filterCards();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReadyToFilter]);

    useEffect(() => {
        setCountLoadedCards(countVisibleCards+countAddCards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredCards]);

    const handlePopupClose = () => {
        setPopupOpen(false);
    }

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
                    setFilterValues = {setFilterValues}
                />
                <Preloader
                    isInRequest = {props.isInRequest}
                />
                <Popup
                    infoText = {'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'}
                    isOpen = {isPopupOpen}
                    onClose = {handlePopupClose}
                />
                <MoviesCardList
                    source={'remote'}
                    cards={filteredCards}
                    savedCards={props.savedCards}
                    countVisibleCards={countVisibleCards}
                    onCardLike={props.onCardLike}
                />

                <div className="more">
                    <button
                        className={`more__button${(filteredCards.length === 0 || filteredCards.length <= countVisibleCards)? " more__button-none" : ""}`}
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

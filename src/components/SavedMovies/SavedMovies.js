import { useState, useEffect } from "react";
//import mainApi from "../../utils/MainApi";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './SavedMovies.css';

function SavedMovies(props) {
    const [filterValues, setFilterValues] = useState({text: '', isShortMovie: false});
    const [isReadyToFilter, setReadyToFilter] = useState(false);
//     const [cards, setCards] = useState([]);

//     useEffect(() => {
//         Promise.all([mainApi.getMovies()])
//         .then(([cards]) => {
//             setCards(cards);
//         })
//         .catch((err) => {
//             console.log("get intitial data - catch - " + err);
//         });
//     }, []);

    const handleFindClick = (values) => {
        setFilterValues(values);
        setReadyToFilter(true);
    }

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
                    setFilterValues = {setFilterValues}
            />
            <MoviesCardList
                source={"saved"}
                cards={props.savedCards}
                savedCards={props.savedCards}
            />
        </main>
        <Footer/>
        </>
    );
}

export default SavedMovies;

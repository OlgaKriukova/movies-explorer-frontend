import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './Movies.css';

function Movies() {
  return (
    <>
        <Header
                isShowButtons={true}
                headerForm={'Movies'}
        />
        <main>
            <SearchForm />
            <MoviesCardList
                source={"remote"}
            />

            <div className="more">
            <button className="more__button">Еще</button>
            </div>
        </main>
        <Footer/>
    </>
  );
}

export default Movies;

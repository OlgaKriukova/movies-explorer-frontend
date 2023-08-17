import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './SavedMovies.css';

function SavedMovies() {
  return (
    <main>
    		<Header
            isShowNavigation={true}
        />
        <SearchForm />
		    <MoviesCardList
            source={"saved"}
        />
        <Footer/>
	  </main>
  );
}

export default SavedMovies;

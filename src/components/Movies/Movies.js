import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './Movies.css';

function Movies() {
  return (
    <main>
		<Header
            isShowNavigation={true}
        />
        <SearchForm />
		<MoviesCardList
			source={"remote"}
		/>

		<div className="more">
		  <button className="more__button">Еще</button>
		</div>
        <Footer/>
	</main>
  );
}

export default Movies;

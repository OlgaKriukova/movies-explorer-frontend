import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './SavedMovies.css';

function SavedMovies() {
  return (
    <>
      <Header
              isShowButtons={true}
              headerForm={'SavedMovies'}
          />
      <main>
          <SearchForm />
          <MoviesCardList
              source={"saved"}
          />
      </main>
      <Footer/>
    </>
  );
}

export default SavedMovies;

import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

function MoviesCardList(props) {
    let showedMovies = [];

    if (props.source === 'remote') {
        showedMovies = props.movies?.slice(0, props.countVisibleMovies);
    } else {
        showedMovies = props.movies?.slice();
    }

    return (
            <section className="movies-card-list" aria-label="фото">
            {showedMovies.map((movie) => (
                <MoviesCard
                    source={props.source}
                    key={movie._id}
                    movie={movie}
                    savedMovies={props.savedMovies}
                    onMovieLike={props.onMovieLike}
                    onMovieDelete={props.onMovieDelete}
                />
            ))}
            </section>
    );
}

export default MoviesCardList;

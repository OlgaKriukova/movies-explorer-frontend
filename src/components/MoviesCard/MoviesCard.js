import iconDelete from "../../images/icon__delete.svg";
import './MoviesCard.css';

function MoviesCard(props) {
    let isLiked = false;

    if (props.source==='remote') {
        isLiked = props.savedMovies.some((i) => i.movieId === props.movie.movieId);
    }

    function timeConvert(n) {
        const num = n;
        const hours = (num / 60);
        const rhours = Math.floor(hours);
        const minutes = (hours - rhours) * 60;
        const rminutes = Math.round(minutes);
        if (rhours > 0 && rminutes > 0) {
            return rhours + 'ч ' + rminutes + 'м';
        } else if (rhours > 0 && rminutes === 0) {
            return rhours + 'ч';
        } else if (rhours === 0 && rminutes > 0) {
            return rminutes + 'м';
        } else {
            return '';
        }
    }

    function handleLikeClick() {
        props.onMovieLike(props.movie);
    }

    function handleDeleteClick() {
        props.onMovieDelete(props.movie);
    }

    return (
        <figure className="movies-card-list__card card">
            <a href={props.movie.trailerLink} target="_blank" className="list__site" rel="noreferrer">
                <img
                    src={props.movie.thumbnail}
                    className="card__img"
                    alt="облложка фильма"
                />
            </a>

            <figcaption className="card__caption">
                <div className="card__movie-like">
                    <p className="card__movie-title">{props.movie.nameRU}</p>
                    {(props.source==='saved') && (
                    <button
                        type="button"
                        className="card__delete"
                        onClick = {handleDeleteClick}
                    >
                        <img
                            className="card__delete-img"
                            alt="Удалить карточку фильма"
                            src={iconDelete}
                    />
                    </button>
                    )}
                    {(props.source==='remote') && (
                        <button
                            type="button"
                            className={`card__like${isLiked ? " card__like_active" : ""}`}
                            onClick={handleLikeClick}
                        />
                    )}
                </div>
                <p className="card__movie-time">{timeConvert(props.movie.duration)}</p>
            </figcaption>
        </figure>
    );
}

export default MoviesCard;

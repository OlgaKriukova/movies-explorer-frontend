import iconDelete from "../../images/icon__delete.svg";
import './MoviesCard.css';

function MoviesCard(props) {
  return (
    <figure className="movies-card-list__card card">
        <img
            src={props.card.link}
            className="card__img"
            alt="облложка фильма"
        />
        <figcaption className="card__caption">
            <div className="card__movie-like">
                <p className="card__movie-title">{props.card.title}</p>
                {(props.source==='saved') && (
                <button type="button" className="card__delete">
                    <img
                        className="card__delete-img"
                        alt="Удалить карточку фильма"
                        src={iconDelete}
                  />
                </button>
                )}
                {(props.source==='remote') && (
                    <button type="button" className="card__like" />
                )}
            </div>
            <p className="card__movie-time">{props.card.duration}</p>
        </figcaption>
    </figure>
  );
}

export default MoviesCard;

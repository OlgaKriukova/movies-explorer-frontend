import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

function MoviesCardList(props) {
    return (
            <section className="movies-card-list" aria-label="фото">
            {props.cards?.slice(0, props.countVisibleCards).map((card) => (
            <MoviesCard
                source={props.source}
                key={card._id}
                card={card}
            />
            ))}
            </section>
    );
}

export default MoviesCardList;

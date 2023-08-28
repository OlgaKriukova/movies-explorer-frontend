import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

function MoviesCardList(props) {
    let showedCards = [];

    if (props.source === 'remote') {
        showedCards = props.cards?.slice(0, props.countVisibleCards);
    } else {
        showedCards = props.cards;
    }

    return (
            <section className="movies-card-list" aria-label="фото">
            {showedCards.map((card) => (
                <MoviesCard
                    source={props.source}
                    key={card._id}
                    card={card}
                    savedCards={props.savedCards}
                    isLiked={true}
                    onCardLike={props.onCardLike}
                />
            ))}
            </section>
    );
}

export default MoviesCardList;

import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__list list">
        <li className="list__text">
            <p className="list__name">Статичный сайт</p>
            <a href="#" className="list__site">
            ↗
            </a>
        </li>
        <li className="list__text">
            <p className="list__name">Адаптивный сайт</p>
            <a
            href="https://olgakriukova.github.io/russian-travel/"
            className="list__site"
            >
            ↗
            </a>
        </li>
        <li className="list__text">
            <p className="list__name">Одностраничное приложение</p>
            <a href="#" className="list__site">
            ↗
            </a>
        </li>
        </ul>
    </section>
  );
}

export default Portfolio;

import { Link } from "react-router-dom";
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__list list">
          <li className="list__text">
              <a href="https://github.com/OlgaKriukova/how-to-learn.git" target="_blank" className="list__site">
                <div className="list__name">Статичный сайт</div><div className="list__name">↗</div>
              </a>
          </li>
          <li className="list__text">
          <a href="https://github.com/OlgaKriukova/how-to-learn.git" target="_blank" className="list__site">
                <div className="list__name">Адаптивный сайт</div><div className="list__name">↗</div>
              </a>
          </li>
          <li className="list__text">
          <a href="https://github.com/OlgaKriukova/how-to-learn.git" target="_blank" className="list__site">
                <div className="list__name">Одностраничное приложение</div><div className="list__name">↗</div>
              </a>
          </li>
        </ul>
    </section>
  );
}

export default Portfolio;

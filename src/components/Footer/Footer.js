import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
        <p className="footer__title">
            Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__bottom bottom">
            <p className="bottom__year">© 2020</p>
            <a href="https://practicum.yandex.ru/" className="bottom__link" target="_blank">
                Яндекс.Практикум
            </a>
            <a href="https://github.com/" className="bottom__link" target="_blank">
                Github
            </a>
        </div>
    </footer>
  );
}

export default Footer;

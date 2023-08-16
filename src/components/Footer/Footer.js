import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
        <p className="footer__title">
            Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__bottom bottom">
            <p className="bottom__year">© 2020</p>
            <a href="#" className="bottom__link">
                Яндекс.Практикум
            </a>
            <a href="#" className="bottom__link">
                Github
            </a>
        </div>
    </footer>
  );
}

export default Footer;

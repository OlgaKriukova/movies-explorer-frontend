import './NotFound.css';
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    function handleButtonBackClick() {
        navigate(-1);
    }

    return (
        <>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="./pages/index.css" type="text/css" />
        <title>404</title>
        <div className="page__container fonts" />
        <main className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__subtitle">Страница не найдена</p>
        </main>
        <button className="back-button"
            onClick={handleButtonBackClick}
        >
            Назад
        </button>
        </>
    );
}

export default NotFound;

import './NotFound.css';
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    function handleButtonBackClick() {
        navigate(-1);
    }

    return (
        <main className="not-found">
            <div className='not-found__container'>
                <h1 className="not-found__title">404</h1>
                <p className="not-found__subtitle">Страница не найдена</p>
                <button className="back-button"
                    onClick={handleButtonBackClick}
                >
                    Назад
                </button>
            </div>
        </main>
    );
}

export default NotFound;

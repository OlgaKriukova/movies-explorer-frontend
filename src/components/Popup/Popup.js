import { useEffect } from "react";
import './Popup.css';

function Popup(props) {
    let infoText = props.infoText;

    function handleClickOutside(evt) {
        props.onClose();
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className={`popup${infoText ? " popup_opened" : ""}`}
        >
            <div className="popup__container popup__container_type_input">
                <button
                    className="popup__close"
                    type="button"
                    onClick={props.onClose}
                />
                <h2 className="popup__title">{props.infoText}</h2>
            </div>
        </div>
    );
  }

export default Popup;

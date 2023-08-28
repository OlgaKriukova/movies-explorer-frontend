import './Popup.css';

function Popup(props) {


    return (
        <div
            className={`popup${props.infoText ? " popup_opened" : ""}`}
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

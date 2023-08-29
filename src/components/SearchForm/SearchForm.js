import { useState, useEffect } from "react";
import {getSavedfilterValues} from "../../utils/util";
import './SearchForm.css';

function SearchForm(props) {
    const [formValues, setFormValues] = useState({text: '', isShortMovie: false});

    useEffect(() => {
        if (props.isUseSavedFilterValues) {
            const savedFilterValues = getSavedfilterValues();
            setFormValues({text: savedFilterValues.text, isShortMovie: savedFilterValues.isShortMovie});
        }
    // }, [props.filterValues]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (evt) => {
        const { name, value, checked } = evt.target;

        if (name === 'isShortMovie') {
            setFormValues({
                ...formValues,
                [name]: checked,
            });
        } else {
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.onSubmit(formValues);
    };

    const handleisShortMovieClick = (evt) => {
        // По чекбоксу ищем только если карточки уже были найдены
        if (props.isFinded) {
            const { checked } = evt.target;
            props.onSubmit({text: formValues.text, isShortMovie: checked});
        }
    };


    return (
        <section className="block-search" aria-label="строка поиска">
        <form
            className="search-form"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="text"
                className="search-form__line"
                placeholder="Фильм"
                maxLength={100}
                value={formValues.text}
                onChange={handleChange}
            />
            <button
                className="search-form__submit"
                value="Search"
            >
                Найти
            </button>
            <div className="search-form__border" />
        </form>
        <div className="block-checkbox">
            <input
                type="checkbox"
                className="block-search__checkbox"
                id="short-film"
                name="isShortMovie"
                onChange={handleChange}
                onClick={handleisShortMovieClick}
                checked={formValues.isShortMovie}
            />
            <label htmlFor="short-film" className="block-search__label">
                Короткометражки
            </label>
        </div>
        </section>
    );
}

export default SearchForm;

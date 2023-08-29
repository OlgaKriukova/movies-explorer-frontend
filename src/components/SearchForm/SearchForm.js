import { useState, useEffect } from "react";
import './SearchForm.css';

function SearchForm(props) {
    const [formValues, setFormValues] = useState({text: props.filterValues.text, isShortMovie: props.filterValues.isShortMovie});

    useEffect(() => {
         setFormValues({text: props.filterValues.text, isShortMovie: props.filterValues.isShortMovie});
    }, [props.filterValues]);

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
        const { checked } = evt.target;
        props.onSubmit({text: formValues.text, isShortMovie: checked});
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

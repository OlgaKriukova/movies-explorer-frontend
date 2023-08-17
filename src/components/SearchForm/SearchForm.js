import './SearchForm.css';

function SearchForm() {
  return (
    <div className="block-search">
	  <form action="" className="search-form">
		<input
		  type="text"
		  name="text"
		  className="search-form__line"
		  placeholder="Фильм"
		  maxLength={100}
		/>
		<button
		  type="submit"
		  name="submit"
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
		  name="short-film"
		  defaultValue="yes"
		/>
		<label htmlFor="short-film" className="block-search__label">
		  Короткометражки
		</label>
	  </div>
	</div>
  );
}

export default SearchForm;

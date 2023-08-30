class MoviesApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    get baseUrl() {
        return this._baseUrl;
      }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getMovies = () => {
        return fetch(this._baseUrl+'/beatfilm-movies', {
            method: 'GET',
            headers: {
            }
        })
        .then(this._checkResponse);
    }
}

const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co',
})

export default moviesApi;

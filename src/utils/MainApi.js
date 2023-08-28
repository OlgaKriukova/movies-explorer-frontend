class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    signup = ({name, email, password}) => {
        return fetch(`${this._baseUrl}/signup`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name, email, password})
        })
        .then(this._checkResponse)
    }

    signin = ({email, password}) => {
        console.log(`signin: ${this._baseUrl}/signin`);
        return fetch(this._baseUrl+'/signin', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        .then(this._checkResponse)
    };

    signout = () => {
        return fetch(`${this._baseUrl}/signout`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(this._checkResponse)
    };

    getUserInfo = () => {
        return fetch(this._baseUrl+'/users/me', {
            method: 'GET',
            credentials: 'include',
            headers: {
        }})
        .then(this._checkResponse);
    }

    setUserInfo = ({name, email}) => {
        return fetch(this._baseUrl+'/users/me', {
                     method: 'PATCH',
                     credentials: 'include',
                     headers: {
                        'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({name, email})
               })
            .then(this._checkResponse);
    }

    getMovies = () => {
        return fetch(this._baseUrl+'/movies', {
            method: 'GET',
            credentials: 'include',
            headers: {
            }
        })
        .then(this._checkResponse);
    }

    createMovie = (movie) => {
        return fetch(this._baseUrl+'/movies', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
             },
             body: JSON.stringify(movie)
        })
        .then(this._checkResponse);
    }

}

const mainApi = new MainApi({
    baseUrl: 'http://localhost:3001',
    //baseUrl: 'https://api.diplomaok.nomoreparties.co',
})

export default mainApi;

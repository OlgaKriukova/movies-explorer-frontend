class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._token = '';
        this.likeCard = this.likeCard.bind(this);
        this.delCard = this.delCard.bind(this);
    }

    get token() {
      return this._token;
    }

    set token(value) {
      this._token = value;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

}

const mainApi = new MainApi({
baseUrl: 'https://api.diplomaok.nomoreparties.co',
})

export default mainApi;

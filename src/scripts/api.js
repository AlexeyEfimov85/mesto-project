export class Api {
  constructor(option) {
    this.URL = option['baseUrl'];
    this.headers = option['headers'];
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  };

  getCards() {
        return fetch(this.URL + 'cards', {
          headers: this.headers
        }).then(this._checkResponse)
  };

  getProfileData() {
    return fetch(this.URL + 'users/me', {
      headers: this.headers
    }).then(this._checkResponse)
  };

  renderProfileData(profileData) {
    return fetch(this.URL + 'users/me', {
      method: 'PATCH',
      headers:  this.headers,
      body: JSON.stringify(profileData)
    }).then(this._checkResponse)
  };
  addCardToServer(cardData) {
    return fetch(this.URL + 'cards', {
      method: 'POST',
      headers:  this.headers,
      body: JSON.stringify(cardData)
    }).then(this._checkResponse)
  };

 sendLike(id) {
    return fetch(`${this.URL}cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify()
    }).then(this._checkResponse)
  };

 deleteLike(id) {
    return fetch(`${this.URL}cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify()
    }).then(this._checkResponse)
  };

 deleteCards(id) {
    return fetch(`${this.URL}cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify()
    }).then(this._checkResponse)
  };

 renderProfileAvatar(profileData) {
    return fetch(this.URL +  'users/me/avatar', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(profileData)
    }).then(this._checkResponse)
      
  };

}



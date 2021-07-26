export default class Api {
  constructor (config) {
    this._baseUrl = config.url;
    this._headers = config.headers;
    
    
  }

  getData () {
    return fetch (this._baseUrl, {
      headers: this._headers
    })
      .then ((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  editProfileInfo (data) {
    return fetch (this._baseUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }

  loadNewCard(card) {
    return fetch (this._baseUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then (res => res.json())
  }

  _putLike () {
    return fetch (this._baseUrl, {
      method: 'PUT',
      headers: this._headers,
    })
  } 
  
  _deleteLike () {
    return fetch (this._baseUrl, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  deleteCard () {
    return fetch (this._baseUrl, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

}
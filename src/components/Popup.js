export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._hadnleEscClose.bind(this);
  }

  open () {
    this._popup.classList.add('popup_opened');
    document.addEventListener ('keydown', this._handleEscClose);
  }

  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener ('keydown', this._handleEscClose);
  }

  _hadnleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners () { 
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }
}
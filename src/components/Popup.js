export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._hadnleEscClose.bind(this);
  }

  openPopup () {
    this._popup.classList.add('popup_opened');
    document.addEventListener ('keydown', this._hadnleEscClose);
  }

  closePopup () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener ('keydown', this._hadnleEscClose);
  }

  _hadnleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  setEventListeners () { 
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
        this.closePopup();
      }
    });
  }
}
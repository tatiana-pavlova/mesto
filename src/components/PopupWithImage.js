import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super (popupSelector);
    this._photo = this._popup.querySelector('.picture__view');
    this._photoName = this._popup.querySelector('.picture__name');
  }

  openPopup (card) {
    super.openPopup();
    this._photo.src = card.link;
    this._photo.alt = card.name;
    this._photoName.textContent = card.name;
  }
}
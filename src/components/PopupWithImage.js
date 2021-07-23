import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor ({popupSelector, pictureViewSelector, pictureNameSelector}) {
    super (popupSelector);
    this._photo = this._popup.querySelector(pictureViewSelector);
    this._photoName = this._popup.querySelector(pictureNameSelector);
  }

  openPopup (card) {
    super.openPopup();
    this._photo.src = card.link;
    this._photo.alt = card.name;
    this._photoName.textContent = card.name;
  }
}
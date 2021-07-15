import Popup from './Popup.js'
import {photo, photoName} from './script.js';

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super (popupSelector);
  }

  openPopup (card) {
    super.openPopup();
    photo.src = card.link;
    photo.alt = card.name;
    photoName.textContent = card.name;
  }
}
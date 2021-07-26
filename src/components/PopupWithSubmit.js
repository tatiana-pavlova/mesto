import Popup from "./Popup.js";

export default class PopupwithSubmit extends Popup {
  constructor ({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._button = document.querySelector(popupSelector).querySelector('.popup__button');
  }

  setDeleteListener() {
    this._button.addEventListener('click', () => { this._handleFormSubmit() }); 
  }
}
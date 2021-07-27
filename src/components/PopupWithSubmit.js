import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor ({popupSelector}) { 
    super(popupSelector);
    this._button = document.querySelector(popupSelector).querySelector('.popup__button');
  }

  setDeleteListener({handleFormSubmit}) {
    this._button.addEventListener('click', () => {handleFormSubmit()});
  }
}
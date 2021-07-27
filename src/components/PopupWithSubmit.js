import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor ({popupSelector}) { 
    super(popupSelector);
    this._form = document.querySelector(popupSelector).querySelector('.popup__form');
  }

  setSubmitAction (action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    })
    super.setEventListeners();
  }  
}
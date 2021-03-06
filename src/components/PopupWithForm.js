import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor ({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = document.querySelector(popupSelector).querySelector('.popup__form');
    this._button = this._formElement.querySelector('.popup__button');
  }

  _getInputValues () {
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    })
    return this._formValues;
  }

  setEventListeners () {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }

  close () {
    super.close();
    this._formElement.reset();
  }

  deleteCard () {
    this._handleFormSubmit();
  }

  renderLoading (isLoading, popup) {
    if (isLoading) {
      this._button.innerHTML = 'Сохранение...';
    } else {
      switch (popup) {
        case 'popupNewCard':
          this._button.innerHTML = 'Создать'
          break;
        default:
          this._button.innerHTML = 'Сохранить'
      }
    }
  }
}
export class FormValidator {
  constructor (objOfSelectors, formElement) {
    this._objOfSelectors = objOfSelectors;
    this._formElement = formElement;
  }


  _showInputError (formInput, errorMessage) {
    const formError = this._formElement.querySelector(`.${formInput.id}-error`);
  
    formInput.classList.add(this._objOfSelectors.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._objOfSelectors.errorClass);
  }


  _hideInputError (formInput) {
    const formError = this._formElement.querySelector(`.${formInput.id}-error`);
  
    formInput.classList.remove(this._objOfSelectors.inputErrorClass);
    formError.classList.remove(this._objOfSelectors.errorClass);
    formError.textContent = '';
  }


  _setEventListener () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._objOfSelectors.inputSelector));
    const buttonElement = this._formElement.querySelector(this._objOfSelectors.submitButtonSelector);
    
    this._toggleButtonState (inputList, buttonElement); 
    
    inputList.forEach((inputElement) => {
      
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);   
        this._toggleButtonState (inputList, buttonElement);
      });
    });
  }


  _isValid (formInput) {
    if (!formInput.validity.valid) {
      this._showInputError(formInput, formInput.validationMessage); 
    } else {
      this._hideInputError(formInput);
    }
  }


  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) { 
      buttonElement.classList.add(this._objOfSelectors.inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(this._objOfSelectors.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }


  _hasInvalidInput (inputList) {
    return inputList.some ((inputElement) => {
      return !inputElement.validity.valid;
    });
  }


  enableValidation () {
    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
  
    this._setEventListener();
  }


  clearFormErrors () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._objOfSelectors.inputSelector));
    const button = this._formElement.querySelector(this._objOfSelectors.submitButtonSelector);
          
    inputList.forEach((input) => {
      this._hideInputError(input);
      this._toggleButtonState(inputList, button);
    });
  }
}
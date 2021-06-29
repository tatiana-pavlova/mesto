export class FormValidator {
  
  constructor (objOfSelectors, formElement) {
    this._objOfSelectors = objOfSelectors;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._objOfSelectors.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._objOfSelectors.submitButtonSelector);
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
    this._toggleButtonState (); 
    
    this._inputList.forEach((inputElement) => {
      
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);   
        this._toggleButtonState ();
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


  _toggleButtonState () {
    if (this._hasInvalidInput()) { 
      this._buttonElement.classList.add(this._objOfSelectors.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', 'disabled');
    } else {
      this._buttonElement.classList.remove(this._objOfSelectors.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }


  _hasInvalidInput () {
    return this._inputList.some ((inputElement) => {
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
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }
}
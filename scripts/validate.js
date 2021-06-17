function showInputError (objOfSelectors, formElement, formInput, errorMessage) {
  const formError = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.add(objOfSelectors.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(objOfSelectors.errorClass);
}


function hideInputError (objOfSelectors, formElement, formInput) {
  const formError = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.remove(objOfSelectors.inputErrorClass);
  formError.classList.remove(objOfSelectors.errorClass);
  formError.textContent = '';
}


function isValid (objOfSelectors, formElement, formInput) {
  if (!formInput.validity.valid) {
    showInputError(objOfSelectors, formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(objOfSelectors, formElement, formInput);
  }
}


function setEventListener (objOfSelectors, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(objOfSelectors.inputSelector));
  const buttonElement = formElement.querySelector(objOfSelectors.submitButtonSelector);
  
  toggleButtonState (objOfSelectors, inputList, buttonElement);
  
  inputList.forEach((inputElement) => {
    
    inputElement.addEventListener('input', () => {
      isValid(objOfSelectors, formElement, inputElement);
      toggleButtonState (objOfSelectors, inputList, buttonElement);
    });
  });
}


function enableValidation (ObjOfSelectors) {
  const formList = Array.from(document.querySelectorAll(ObjOfSelectors.formSelector));
  
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListener (ObjOfSelectors, formElement);
  });
}


function hasInvalidInput (inputList) {
  return inputList.some ((inputElement) => {
    return !inputElement.validity.valid;
  });
}


function toggleButtonState (objOfSelectors, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(objOfSelectors.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(objOfSelectors.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
// const formElement = document.querySelector('.popup__form')
// const formInput = formElement.querySelector('.popup__input')


function showInputError (formElement, formInput, errorMessage) {
  const formError = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.add('popup__input_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__form-error_active');
}

function hideInputError (formElement, formInput) {
  const formError = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.remove('popup__input_type_error');
  formError.classList.remove('popup__form-error_active');
  formError.textContent = '';
}

function isValid (formElement, formInput) {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput);
    
  }
}

function setEventListener (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
    });
  });
}

function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener (formElement);
  });
}

enableValidation();
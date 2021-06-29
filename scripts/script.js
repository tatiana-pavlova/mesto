import { Card } from "./Card.js";
import { initialCards } from "./initialCards.js";
import { FormValidator } from "./FormValidator.js";

export {openPopup, popupPhoto, photo, photoName};

const popups = document.querySelectorAll('.popup');
const openPopupEdit = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupEditForm = popupEdit.querySelector('.popup__form');
const editName = document.querySelector('.popup__input_edit_name');
const profileName = document.querySelector('.profile__name');
const editJob = document.querySelector('.popup__input_edit_job');
const profileJob = document.querySelector('.profile__job-info');
const formEditElement = popupEdit.querySelector('.popup__form');
const openPopupAdd = document.querySelector('.profile__add');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupAddForm = popupAdd.querySelector('.popup__form');
const formAddElement = popupAdd.querySelector('.popup__form');
const newCardName = popupAdd.querySelector('.popup__input_place-name');
const newCardLink = popupAdd.querySelector('.popup__input_place-link');
const cardPlace = document.querySelector('.places');
const popupPhoto = document.querySelector('.popup_type_photo');
const photo = popupPhoto.querySelector('.picture__view');
const photoName = popupPhoto.querySelector('.picture__name');
const cardTemplate = document.querySelector('#place').content;
const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
const popupEditValidator = new FormValidator (selectors, popupEditForm);
const popupAddValidator = new FormValidator (selectors, popupAddForm);


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeyPress);
}


function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKeyPress);
}


function openProfilePopup() {
  editName.value = profileName.textContent;
  editJob.value = profileJob.textContent;
  openPopup(popupEdit);
  popupEditValidator.clearFormErrors();
}


function openAddPopup() {
  formAddElement.reset();
  openPopup(popupAdd);
  popupAddValidator.clearFormErrors();
}


function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = editName.value;
  profileJob.textContent = editJob.value;
  closePopup(popupEdit);
}


function handleAddFormSubmit (evt) {
  evt.preventDefault();
  const newCard = {
    name:newCardName.value,
    link:newCardLink.value
  }
  
  cardPlace.prepend(createCard (newCard));
  
  closePopup(popupAdd);
}


function downloadCards (cardArray) {
  cardArray.forEach((card) => {
    cardPlace.append(createCard (card));
  });
}

function createCard (card) {
  const newCard = new Card (card, cardTemplate);
  return newCard.generateCard();
}


function handleKeyPress (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}


downloadCards(initialCards);
popupEditValidator.enableValidation();
popupAddValidator.enableValidation();


popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
})

openPopupEdit.addEventListener('click', () => openProfilePopup());

formEditElement.addEventListener ('submit', handleEditFormSubmit);

openPopupAdd.addEventListener('click', () => openAddPopup());

formAddElement.addEventListener('submit', handleAddFormSubmit);
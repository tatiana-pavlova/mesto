import { Card } from "./Card.js";
import { initialCards } from "./initialCards.js";
import { FormValidator } from "./FormValidator.js";

export {openPopup, popupPhoto};

const openPopupEdit = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_type_edit-profile');
const closePopupEdit = popupEdit.querySelector('.popup__close');
const editName = document.querySelector('.popup__input_edit_name');
const profileName = document.querySelector('.profile__name');
const editJob = document.querySelector('.popup__input_edit_job');
const profileJob = document.querySelector('.profile__job-info');
const formEditElement = popupEdit.querySelector('.popup__form');
const openPopupAdd = document.querySelector('.profile__add');
const popupAdd = document.querySelector('.popup_type_new-card');
const closePopupAdd = popupAdd.querySelector('.popup__close');
const formAddElement = popupAdd.querySelector('.popup__form');
const newCardName = popupAdd.querySelector('.popup__input_place-name');
const newCardLink = popupAdd.querySelector('.popup__input_place-link');
const cardPlace = document.querySelector('.places');
const cardDelete = document.querySelector('.place__delete');
const popupPhoto = document.querySelector('.popup_type_photo');
const closePopupPhoto = document.querySelector('.picture__close');
const cardTemplate = document.querySelector('#place').content;
const formList = Array.from(document.querySelectorAll('.popup__form'));
const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeyPress);
  popup.addEventListener('click', handleOverlayClick); 
}


function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKeyPress);
  popup.removeEventListener('click', handleOverlayClick);
}


function openProfilePopup() {
  editName.value = profileName.textContent;
  editJob.value = profileJob.textContent;
  openPopup(popupEdit);
  const form = getFormFromPopup(popupEdit);
  const validator = new FormValidator (selectors, form)
  validator.clearFormErrors();
}


function openAddPopup() {
  formAddElement.reset();
  openPopup(popupAdd);
  const form = getFormFromPopup(popupAdd);
  const validator = new FormValidator (selectors, form)
  validator.clearFormErrors();
}

function getFormFromPopup (popup) {
  return popup.querySelector('.popup__form');
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

  const placeCard = new Card (newCard, cardTemplate);
  
  cardPlace.prepend(placeCard.generateCard());
  
  closePopup(popupAdd);
}


function downloadCards (cardArray) {
  cardArray.forEach((card) => {
    const newCard = new Card (card, cardTemplate);
    cardPlace.append(newCard.generateCard());
  });
}


function handleOverlayClick(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  
  if (evt.target === evt.currentTarget) {
    closePopup(openedPopup);
  }
}


function handleKeyPress (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}


downloadCards(initialCards);

formList.forEach((form) => {
  const validator = new FormValidator (selectors, form);
  validator.enableValidation ();
});


openPopupEdit.addEventListener('click', () => openProfilePopup());

closePopupEdit.addEventListener('click', () => closePopup(popupEdit));

formEditElement.addEventListener ('submit', handleEditFormSubmit);


openPopupAdd.addEventListener('click', () => openAddPopup());

closePopupAdd.addEventListener('click', () => closePopup(popupAdd));

formAddElement.addEventListener('submit', handleAddFormSubmit);


closePopupPhoto.addEventListener('click', () => closePopup(popupPhoto));
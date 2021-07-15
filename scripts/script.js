import Card from "./Card.js";
import { initialCards } from "./initialCards.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

export {photo, photoName};


const openPopupEdit = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupEditForm = popupEdit.querySelector('.popup__form');
const editName = document.querySelector('.popup__input_edit_name');
const editJob = document.querySelector('.popup__input_edit_job');
const openPopupAdd = document.querySelector('.profile__add');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupAddForm = popupAdd.querySelector('.popup__form');
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
const cardPlaceSelector = '.places';
const userNameSelector = '.profile__name';
const userJobSelector = '.profile__job-info';

const popupEditValidator = new FormValidator (selectors, popupEditForm);
const popupAddValidator = new FormValidator (selectors, popupAddForm);

const cardList = new Section ({
  items: initialCards,
  renderer: (cardItem) => {
    const cardElement = createCard(cardItem);
    
    cardList.addItem(cardElement);
  }
}, cardPlaceSelector);

const popupShowPhoto = new PopupWithImage ('.popup_type_photo');

const popupEditProfile = new PopupWithForm ({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: ({name, job}) => {
    userInfoData.setUserInfo({userName: name, userJob: job});
    popupEditProfile.closePopup();
  }
});

const popupNewCard = new PopupWithForm ({
  popupSelector: '.popup_type_new-card',
  handleFormSubmit: ({placeName, placeLink}) => {
    const newCard = {
      name: placeName,
      link: placeLink
    }
    cardList.addItem(createCard (newCard));
    popupNewCard.closePopup();
  }
})

const userInfoData = new UserInfo ({userNameSelector, userJobSelector});


function createCard (card) {
  const newCard = new Card ({
    card: card, 
    template: cardTemplate,
    handleCardClick: (card) => {
      popupShowPhoto.openPopup(card);
    } 
  });
  return newCard.generateCard();
}


cardList.renderItem();

popupShowPhoto.setEventListeners();
popupEditProfile.setEventListeners();
popupNewCard.setEventListeners();

popupEditValidator.enableValidation();
popupAddValidator.enableValidation();


openPopupEdit.addEventListener('click', () => {
  const {userName, userJob} = userInfoData.getUserInfo();
  editName.value = userName;
  editJob.value = userJob;
  popupEditProfile.openPopup();
  popupEditValidator.clearFormErrors();
}); 

openPopupAdd.addEventListener('click', () => popupNewCard.openPopup()); 
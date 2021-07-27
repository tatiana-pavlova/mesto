import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";


const openPopupEdit = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupEditForm = popupEdit.querySelector('.popup__form');
const editName = document.querySelector('.popup__input_edit_name');
const editJob = document.querySelector('.popup__input_edit_job');
const openPopupAdd = document.querySelector('.profile__add');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAvatar = document.querySelector('.popup_type_edit-avatar');
const popupAvatarForm = popupAvatar.querySelector('.popup__form');
const avatarEdit = document.querySelector('.profile__avatar-overlay');
const cardTemplate = document.querySelector('#place').content;
let userId = null;

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
const userAvatarSelector = '.profile__avatar';

const popupEditValidator = new FormValidator (selectors, popupEditForm);
const popupAddValidator = new FormValidator (selectors, popupAddForm);
const popupAvatarValidator = new FormValidator (selectors, popupAvatarForm)

const cardList = new Section (
  {renderer: (cardItem) => {
    const cardElement = createCard(cardItem);
    cardList.addItem(cardElement);
  }
}, cardPlaceSelector);

const popupShowPhoto = new PopupWithImage ({popupSelector: '.popup_type_photo', 
  pictureViewSelector:'.picture__view', pictureNameSelector: '.picture__name'});

const popupEditProfile = new PopupWithForm ({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: ({name, job}) => {
    userInfoData.setUserInfo({userName: name, userJob: job});
    popupEditProfile.renderLoading(true);
    apiUserInfo.editProfileInfo({name: name, about: job})
      .catch ((err) => {
        console.log(err);
      })
      .finally (() => { 
        popupEditProfile.renderLoading(false);
      });
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
    popupNewCard.renderLoading(true,'popupNewCard');
    apiCards.loadNewCard(newCard)
      .then ((res) => {
        cardList.addItem(createCard(res));
        popupNewCard.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally (() => { 
        popupNewCard.renderLoading(false,'popupNewCard');
      })
  }
})

const popupAvatarEdit = new PopupWithForm ({
  popupSelector: '.popup_type_edit-avatar',
  handleFormSubmit: ({avatar}) => {
    popupAvatarEdit.renderLoading(true); 
    apiUserAvatar.editUserAvatar(avatar)
      .catch ((err) => {
        console.log(err);
      })
      .finally (() => {
        popupAvatarEdit.renderLoading(false); 
      })
    userInfoData.setUserAvatar(avatar);
    popupAvatarEdit.closePopup();
  }
})

const popupDeleteCard = new PopupWithSubmit ({popupSelector: '.popup_type_delete-card'});

  
const userInfoData = new UserInfo ({userNameSelector, userJobSelector, userAvatarSelector});


const apiUserInfo = new Api({url: 'https://nomoreparties.co/v1/cohort-26/users/me', 
  headers: {authorization: 'adc76ba5-f155-4ece-b7e2-4db6eaf8ed57',
            'Content-Type': 'application/json'}
});

const apiUserAvatar = new Api ({url: 'https://mesto.nomoreparties.co/v1/cohort-26/users/me/avatar',
  headers: {authorization: 'adc76ba5-f155-4ece-b7e2-4db6eaf8ed57',
            'Content-Type': 'application/json'}
})

const apiCards = new Api ({url: 'https://mesto.nomoreparties.co/v1/cohort-26/cards', 
  headers: {authorization: 'adc76ba5-f155-4ece-b7e2-4db6eaf8ed57',
            'Content-Type': 'application/json'}
});


apiUserInfo.getData()
  .then ((res) => {
    userInfoData.setUserInfo({userName: res.name, userJob: res.about});
    userInfoData.setUserAvatar(res.avatar);
    userId = res._id;
  })
  .catch((err) => {
    console.log(err);
  });


apiCards.getData()
  .then ((res) => {
    cardList.renderItem(res.reverse());
  })
  .catch ((err) => {
    console.log(`Ошибка: ${err}`);
  })


function createCard (card) {

  const apiCardLike = new Api ({url: `https://mesto.nomoreparties.co/v1/cohort-26/cards/likes/${card._id}`, 
        headers: {authorization: 'adc76ba5-f155-4ece-b7e2-4db6eaf8ed57',
                  'Content-Type': 'application/json'}
      });

  const apiCard = new Api ({url: `https://mesto.nomoreparties.co/v1/cohort-26/cards/${card._id}`, 
        headers: {authorization: 'adc76ba5-f155-4ece-b7e2-4db6eaf8ed57',
                  'Content-Type': 'application/json'}
      });

  const newCard = new Card ({
    card: card,
    userId: userId,
    template: cardTemplate,
    handleCardClick: (card) => {
      popupShowPhoto.openPopup(card);
    },
    likeClick: () => {
      return apiCardLike.putLike()
    },
    dislikeClick: () => {
      return apiCardLike.deleteItem()
    },
    handleDeleteClick: () => {
      popupDeleteCard.openPopup();
      popupDeleteCard.setDeleteListener({handleFormSubmit: () => {
        apiCard.deleteItem()
        .then ((res) => {
          newCard.deleteCardElement();
          popupDeleteCard.closePopup();
        })
        .catch((err) => {
          console.log(err);
        })
      }});
    }
  });
  return newCard.generateCard();
}


popupShowPhoto.setEventListeners();
popupEditProfile.setEventListeners();
popupNewCard.setEventListeners();
popupDeleteCard.setEventListeners();
popupAvatarEdit.setEventListeners();


popupEditValidator.enableValidation();
popupAddValidator.enableValidation();
popupAvatarValidator.enableValidation();



openPopupEdit.addEventListener('click', () => {
  const {userName, userJob} = userInfoData.getUserInfo();
  editName.value = userName;
  editJob.value = userJob;
  popupEditProfile.openPopup();
  popupEditValidator.clearFormErrors();
}); 

openPopupAdd.addEventListener('click', () => {
  popupNewCard.openPopup();
  popupAddValidator.clearFormErrors();
});

avatarEdit.addEventListener('click', () => {
  popupAvatarEdit.openPopup();
  popupAvatarValidator.clearFormErrors();
})
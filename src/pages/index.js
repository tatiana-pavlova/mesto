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
const popupSelectors = {
  showPhotoSelector: '.popup_type_photo',
  editProfileSelector: '.popup_type_edit-profile',
  newCardSelector: '.popup_type_new-card',
  editAvatarSelector: '.popup_type_edit-avatar',
  deleteCardSelector: '.popup_type_delete-card'
}
const cardPlaceSelector = '.places';
const userNameSelector = '.profile__name';
const userJobSelector = '.profile__job-info';
const userAvatarSelector = '.profile__avatar';
const photoViewSelector = '.picture__view';
const photoNameSelector = '.picture__name';


const popupEditValidator = new FormValidator (selectors, popupEditForm);
const popupAddValidator = new FormValidator (selectors, popupAddForm);
const popupAvatarValidator = new FormValidator (selectors, popupAvatarForm);


const cardList = new Section (
  {renderer: (cardItem) => {
    const cardElement = createCard(cardItem);
    cardList.addItem(cardElement);
  }
}, cardPlaceSelector);


const popupShowPhoto = new PopupWithImage ({popupSelector: popupSelectors.showPhotoSelector, 
  pictureViewSelector: photoViewSelector, pictureNameSelector: photoNameSelector});

const popupEditProfile = new PopupWithForm ({
  popupSelector: popupSelectors.editProfileSelector,
  handleFormSubmit: ({name, job}) => {
    userInfoData.setUserInfo({userName: name, userJob: job});
    popupEditProfile.renderLoading(true);
    api.editProfileInfo({name: name, about: job})
      .catch ((err) => {
        console.log(err);
      })
      .finally (() => { 
        popupEditProfile.renderLoading(false);
      });
    popupEditProfile.close();
  }
});

const popupNewCard = new PopupWithForm ({
  popupSelector: popupSelectors.newCardSelector,
  handleFormSubmit: ({placeName, placeLink}) => {
    const newCard = {
      name: placeName,
      link: placeLink
    }
    popupNewCard.renderLoading(true,'popupNewCard');
    api.loadNewCard(newCard)
      .then ((res) => {
        cardList.addItem(createCard(res));
        popupNewCard.close();
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
  popupSelector: popupSelectors.editAvatarSelector,
  handleFormSubmit: ({avatar}) => {
    popupAvatarEdit.renderLoading(true); 
    api.editUserAvatar(avatar)
      .then (() => { 
        userInfoData.setUserAvatar(avatar);
        popupAvatarEdit.close();
      })
      .catch ((err) => {
        console.log(err);
      })
      .finally (() => {
        popupAvatarEdit.renderLoading(false); 
      })
    
  }
})

const popupDeleteCard = new PopupWithSubmit ({popupSelector: popupSelectors.deleteCardSelector});

  
const userInfoData = new UserInfo ({userNameSelector, userJobSelector, userAvatarSelector});


const api = new Api({url: 'https://nomoreparties.co/v1/cohort-26', 
  headers: {authorization: 'adc76ba5-f155-4ece-b7e2-4db6eaf8ed57',
            'Content-Type': 'application/json'}
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([resUser, resCards]) => {
    userInfoData.setUserInfo({userName: resUser.name, userJob: resUser.about});
    userInfoData.setUserAvatar(resUser.avatar);
    userId = resUser._id;
    cardList.renderItem(resCards.reverse());
  })
  .catch((err) => {
    console.log(err);
  });
  

function createCard (card) {
  const newCard = new Card ({
    card: card,
    userId: userId,
    template: cardTemplate,
    handleCardClick: (card) => {
      popupShowPhoto.open(card);
    },
    likeClick: (counter) => {
      api.putLike(card._id)
        .then ((res) => {
          counter.textContent = res.likes.length;
        })
        .catch ((err) => {
          console.log(err);
        })
    },
    dislikeClick: (counter) => {
      api.deleteLike(card._id)
        .then ((res) => {
          counter.textContent = res.likes.length;
        })
        .catch ((err) => {
          console.log(err);
        })
    },
    handleDeleteClick: () => {
      popupDeleteCard.open();
      popupDeleteCard.setSubmitAction(() => {
        api.deleteCard(card._id)
          .then (() => {
            newCard.deleteCardElement();
            popupDeleteCard.close();
          })
          .catch((err) => {
            console.log(err);
          })
      });
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
  popupEditProfile.open();
  popupEditValidator.clearFormErrors();
}); 

openPopupAdd.addEventListener('click', () => {
  popupNewCard.open();
  popupAddValidator.clearFormErrors();
});

avatarEdit.addEventListener('click', () => {
  popupAvatarEdit.open();
  popupAvatarValidator.clearFormErrors();
})
let openPopupEdit = document.querySelector('.profile__edit');
let popupEdit = document.querySelector('.popup_type_editProfile');
let closePopupEdit = popupEdit.querySelector('.popup__close');
let editName = document.querySelector('.popup__input_edit_name');
let profileName = document.querySelector('.profile__name');
let editJob = document.querySelector('.popup__input_edit_job');
let profileJob = document.querySelector('.profile__job-info');
let formEditElement = popupEdit.querySelector('.popup__form');
let openPopupAdd = document.querySelector('.profile__add');
let popupAdd = document.querySelector('.popup_type_newCard');
const closePopupAdd = popupAdd.querySelector('.popup__close');
const formAddElement = popupAdd.querySelector('.popup__form');
const newCardName = popupAdd.querySelector('.popup__input_placeName');
const newCardLink = popupAdd.querySelector('.popup__input_placeLink');
const cardPlace = document.querySelector('.places');
const cardDelete = document.querySelector('.place__delete');
const popupPhoto = document.querySelector('.popup_type_photo');
const closePopupPhoto = document.querySelector('.picture__close');



const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function changePopupClass(popup) {
  popup.classList.toggle('popup_opened');

  if (popup.classList.contains('popup_type_editProfile') && popup.classList.contains('popup_opened')) {
    editName.value = profileName.textContent;
    editJob.value = profileJob.textContent;
  }
}

function formEditSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = editName.value;
  profileJob.textContent = editJob.value;
  changePopupClass(popupEdit);
}

function formAddSubmitHandler (evt) {
  evt.preventDefault();
  cardPlace.prepend(addCard(newCardName.value, newCardLink.value));
  newCardName.value = '';
  newCardLink.value = '';
  changePopupClass(popupAdd);
}


// добавление первоначальных карточек на страницу
function addCard (cardName, cardLink) {
  const cardTemplate = document.querySelector('#place').content;
  const cardElement = cardTemplate.querySelector('.place').cloneNode(true);

  cardElement.querySelector('.place__name').textContent = cardName;
  cardElement.querySelector('.place__pic').src = cardLink;

  cardElement.querySelector('.place__like').addEventListener ('click', function(evt) {
    evt.target.classList.toggle('place__like_active');
  });

  cardElement.querySelector('.place__delete').addEventListener ('click', function (evt) {
    evt.target.closest('.place').remove();
  });

  cardElement.querySelector('.place__pic').addEventListener ('click', function (evt) {
    changePopupClass(popupPhoto);
    showPicture (evt.target.closest('.place'));
  });

  return cardElement;
}

function downloadCards (cardArray) {
  cardArray.forEach((card) => {
    cardPlace.append(addCard (card.name, card.link));
  });
}

function showPicture (picChosen) {
  const picTemplate = document.querySelector('#picture').content;
  const picElement = picTemplate.querySelector('.picture').cloneNode(true);

  picElement.querySelector('.picture__view').src = picChosen.querySelector('.place__pic').src;
  picElement.querySelector('.picture__name').textContent = picChosen.querySelector('.place__name').textContent;

  picElement.querySelector('.picture__close').addEventListener('click', () => {
    changePopupClass(popupPhoto);
    picElement.remove();
  });

  popupPhoto.append(picElement);
}


downloadCards(initialCards);

openPopupEdit.addEventListener('click', () => changePopupClass(popupEdit));

closePopupEdit.addEventListener('click', () => changePopupClass(popupEdit));

formEditElement.addEventListener ('submit', formEditSubmitHandler);


openPopupAdd.addEventListener('click', () => changePopupClass(popupAdd));

closePopupAdd.addEventListener('click', () => changePopupClass(popupAdd));

formAddElement.addEventListener('submit', formAddSubmitHandler);







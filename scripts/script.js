const openPopupEdit = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_type_editProfile');
const closePopupEdit = popupEdit.querySelector('.popup__close');
const editName = document.querySelector('.popup__input_edit_name');
const profileName = document.querySelector('.profile__name');
const editJob = document.querySelector('.popup__input_edit_job');
const profileJob = document.querySelector('.profile__job-info');
const formEditElement = popupEdit.querySelector('.popup__form');
const openPopupAdd = document.querySelector('.profile__add');
const popupAdd = document.querySelector('.popup_type_newCard');
const closePopupAdd = popupAdd.querySelector('.popup__close');
const formAddElement = popupAdd.querySelector('.popup__form');
const newCardName = popupAdd.querySelector('.popup__input_placeName');
const newCardLink = popupAdd.querySelector('.popup__input_placeLink');
const cardPlace = document.querySelector('.places');
const cardDelete = document.querySelector('.place__delete');
const popupPhoto = document.querySelector('.popup_type_photo');
const closePopupPhoto = document.querySelector('.picture__close');
const cardTemplate = document.querySelector('#place').content;



function openPopup(popup) {
  popup.classList.add('popup_opened');
}


function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


function openProfilePopup() {
  editName.value = profileName.textContent;
  editJob.value = profileJob.textContent;
  openPopup(popupEdit);
}


function closeAddPopup() {
  newCardName.value = '';
  newCardLink.value = '';
  closePopup(popupAdd);
}


function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = editName.value;
  profileJob.textContent = editJob.value;
  closePopup(popupEdit);
}


function handleAddFormSubmit (evt) {
  evt.preventDefault();
  const newCard = [];
  newCard.name = newCardName.value;
  newCard.link = newCardLink.value;
  cardPlace.prepend(addCard(newCard));
  closeAddPopup();
}


function addCard (card) {
  const cardElement = cardTemplate.querySelector('.place').cloneNode(true);

  cardElement.querySelector('.place__name').textContent = card.name;
  cardElement.querySelector('.place__pic').src = card.link;
  cardElement.querySelector('.place__pic').alt = card.name;

  cardElement.querySelector('.place__like').addEventListener ('click', function(evt) {
    evt.target.classList.toggle('place__like_active');
  });

  cardElement.querySelector('.place__delete').addEventListener ('click', function (evt) {
    evt.target.closest('.place').remove();
  });

  cardElement.querySelector('.place__pic').addEventListener ('click', function (evt) {
    openPopup(popupPhoto);
    showPicture (evt.target.closest('.place'));
  });

  return cardElement;
}


function downloadCards (cardArray) {
  cardArray.forEach((card) => {
    cardPlace.append(addCard (card));
  });
}


function showPicture (picChosen) {
  popupPhoto.querySelector('.picture__view').src = picChosen.querySelector('.place__pic').src;
  popupPhoto.querySelector('.picture__view').alt = picChosen.querySelector('.place__name').textContent;
  popupPhoto.querySelector('.picture__name').textContent = picChosen.querySelector('.place__name').textContent;
}


downloadCards(initialCards);


openPopupEdit.addEventListener('click', () => openProfilePopup());

closePopupEdit.addEventListener('click', () => closePopup(popupEdit));

formEditElement.addEventListener ('submit', handleEditFormSubmit);


openPopupAdd.addEventListener('click', () => openPopup(popupAdd));

closePopupAdd.addEventListener('click', () => closeAddPopup());

formAddElement.addEventListener('submit', handleAddFormSubmit);


closePopupPhoto.addEventListener('click', () => closePopup(popupPhoto));
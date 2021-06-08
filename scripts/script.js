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
  formAddElement.reset();
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
  const newCard = {
    name:newCardName.value,
    link:newCardLink.value
  }
  
  cardPlace.prepend(addCard(newCard));
  closeAddPopup();
}


function addCard (card) {
  const cardElement = cardTemplate.querySelector('.place').cloneNode(true);

  cardElement.querySelector('.place__name').textContent = card.name;
  const image = cardElement.querySelector('.place__pic');
  image.src = card.link;
  image.alt = card.name;

  // cardElement.querySelector('.place__like').addEventListener ('click', function (evt) {
  //   evt.target.classList.toggle('place__like_active');
  // });

  cardElement.querySelector('.place__like').addEventListener ('click', (evt) => handleLikeClick (evt.target));
  

  // cardElement.querySelector('.place__delete').addEventListener ('click', function (evt) {
  //   evt.target.closest('.place').remove();
  // });

  cardElement.querySelector('.place__delete').addEventListener ('click', (evt) => handleDeleteCardClick (evt.target));
    

  // cardElement.querySelector('.place__pic').addEventListener ('click', function (evt) {
  //   openPopup(popupPhoto);
  //   showPicture (evt.target.closest('.place'));
  // });

  cardElement.querySelector('.place__pic').addEventListener ('click', (evt) => handlePictureClick (evt.target));
    

  return cardElement;
}

function handleLikeClick (element) {
  element.classList.toggle('place__like_active');
}

function handleDeleteCardClick (element) {
  element.closest('.place').remove();
}

function handlePictureClick (element) {
  openPopup(popupPhoto);
  showPicture (element.closest('.place'));
}


function downloadCards (cardArray) {
  cardArray.forEach((card) => {
    cardPlace.append(addCard (card));
  });
}


function showPicture (picChosen) {
  const photo = popupPhoto.querySelector('.picture__view');
  photo.src = picChosen.querySelector('.place__pic').src;
  photo.alt = picChosen.querySelector('.place__name').textContent;
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
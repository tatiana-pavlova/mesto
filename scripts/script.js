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
  clearFormErrors (popupEdit);
}


function openAddPopup() {
  formAddElement.reset();
  openPopup(popupAdd);
  clearFormErrors (popupAdd);
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
  
  closePopup(popupAdd);
}


function addCard (card) {
  const cardElement = cardTemplate.querySelector('.place').cloneNode(true);

  cardElement.querySelector('.place__name').textContent = card.name;
  const image = cardElement.querySelector('.place__pic');
  image.src = card.link;
  image.alt = card.name;

  cardElement.querySelector('.place__like').addEventListener ('click', (evt) => handleLikeClick (evt.target));
  
  cardElement.querySelector('.place__delete').addEventListener ('click', (evt) => handleDeleteCardClick (evt.target));
    
  cardElement.querySelector('.place__pic').addEventListener ('click', () => handlePictureClick (card.name, card.link));
    

  return cardElement;
}


function handleLikeClick (element) {
  element.classList.toggle('place__like_active');
}


function handleDeleteCardClick (element) {
  element.closest('.place').remove();
}


function handlePictureClick (picName, picLink) {
  openPopup(popupPhoto);
  showPicture (picName, picLink);
}


function downloadCards (cardArray) {
  cardArray.forEach((card) => {
    cardPlace.append(addCard (card));
  });
}


function showPicture (picName, picLink) {
  const photo = popupPhoto.querySelector('.picture__view');
  photo.src = picLink;
  photo.alt = picName;
  popupPhoto.querySelector('.picture__name').textContent = picName;
}


function handleOverlayClick(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  const container = openedPopup.firstElementChild;

  if (evt.target.closest(`.${container.className}`) != container) {
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


openPopupEdit.addEventListener('click', () => openProfilePopup());

closePopupEdit.addEventListener('click', () => closePopup(popupEdit));

formEditElement.addEventListener ('submit', handleEditFormSubmit);


openPopupAdd.addEventListener('click', () => openAddPopup());

closePopupAdd.addEventListener('click', () => closePopup(popupAdd));

formAddElement.addEventListener('submit', handleAddFormSubmit);


closePopupPhoto.addEventListener('click', () => closePopup(popupPhoto));
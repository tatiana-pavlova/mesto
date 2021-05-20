let openProfileEdit = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close');
let editName = document.querySelector('.popup__input_edit_name');
let profileName = document.querySelector('.profile__name');
let editJob = document.querySelector('.popup__input_edit_job');
let profileJob = document.querySelector('.profile__job-info');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_edit_name');
let jobInput = document.querySelector('.popup__input_edit_job');


function openPopupForm() {
  popup.classList.add('popup_opened');
  editName.value = profileName.textContent;
  editJob.value = profileJob.textContent;
}

function closePopupForm() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopupForm();
}


openProfileEdit.addEventListener('click', openPopupForm);

closePopup.addEventListener('click', closePopupForm);

formElement.addEventListener ('submit', formSubmitHandler);
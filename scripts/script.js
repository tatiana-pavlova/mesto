// открытие/закрытие поп-апа
let openProfileEdit = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close');

openProfileEdit.addEventListener('click', toggleClass);

closePopup.addEventListener('click', toggleClass)

function toggleClass() {
  popup.classList.toggle('popup_opened');
}

// перенос данных из профайла в инпуты поп-апа
let editName = document.querySelector('.popup__editName');
let profileName = document.querySelector('.profile__name');
let editJob = document.querySelector('.popup__editJob');
let profileJob = document.querySelector('.profile__job-info');

editName.value = profileName.textContent;
editJob.value = profileJob.textContent;

// внесение изменений в форму профиля
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__editName');
let jobInput = document.querySelector('.popup__editJob');

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  toggleClass();
}

formElement.addEventListener ('submit', formSubmitHandler);
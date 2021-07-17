export default class Card {
  constructor({card, template, handleCardClick}) {
    this._card = card;
    this._name = card.name;
    this._src = card.link;
    this._alt = card.name;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {   
    const cardElement = this._template.querySelector('.place').cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => { this._handleLikeClick() });
    this._deleteButton.addEventListener ('click', () => { this._handleDeleteCardClick() });
    this._imageElement.addEventListener ('click', () => { this._handleCardClick (this._card) });
  }

  _handleLikeClick () {
    this._likeButton.classList.toggle('place__like_active');
  }

  _handleDeleteCardClick () {
    this._deleteButton.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate(); 
    this._titleElement = this._element.querySelector('.place__name');
    this._imageElement = this._element.querySelector('.place__pic');
    this._likeButton = this._element.querySelector('.place__like');
    this._deleteButton = this._element.querySelector('.place__delete');

    this._setEventListeners();

    this._titleElement.textContent = this._name;
    this._imageElement.src = this._src;
    this._imageElement.alt = this._alt;

    return this._element;
  }
}
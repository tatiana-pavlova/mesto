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
    this._element.querySelector('.place__like').addEventListener('click', () => { this._handleLikeClick() });
    this._element.querySelector('.place__delete').addEventListener ('click', () => { this._handleDeleteCardClick() });
    this._element.querySelector('.place__pic').addEventListener ('click', () => { this._handleCardClick (this._card) });
  }

  _handleLikeClick () {
    this._element.querySelector('.place__like').classList.toggle('place__like_active');
  }

  _handleDeleteCardClick () {
    this._element.querySelector('.place__delete').closest('.place').remove();
  }

  generateCard() {
    this._element = this._getTemplate(); 
    this._setEventListeners();

    this._element.querySelector('.place__name').textContent = this._name;
    const image = this._element.querySelector('.place__pic');
    image.src = this._src;
    image.alt = this._alt;

    return this._element;
  }
}
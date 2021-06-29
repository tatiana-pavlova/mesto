import { openPopup, popupPhoto, photo, photoName } from "./script.js";

export class Card {
  constructor(card, template) {
    this._name = card.name;
    this._src = card.link;
    this._alt = card.name;
    this._template = template;
  }


  _getTemplate() {   
    const cardElement = this._template.querySelector('.place').cloneNode(true);

    return cardElement;
  }


  _setEventListeners() {
    this._element.querySelector('.place__like').addEventListener('click', () => { this._handleLikeClick() });
    this._element.querySelector('.place__delete').addEventListener ('click', () => { this._handleDeleteCardClick() });
    this._element.querySelector('.place__pic').addEventListener ('click', () => { this._handlePictureClick () });
  }


  _handleLikeClick () {
    this._element.querySelector('.place__like').classList.toggle('place__like_active');
  }


  _handleDeleteCardClick () {
    this._element.querySelector('.place__delete').closest('.place').remove();
  }


  _handlePictureClick () {
    openPopup(popupPhoto);
    this._showPicture ();
  }


  _showPicture () {
    photo.src = this._src;
    photo.alt = this._alt;
    photoName.textContent = this._name;
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
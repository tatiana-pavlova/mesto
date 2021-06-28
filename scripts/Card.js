import { openPopup, popupPhoto } from "./script.js";

export class Card {
  constructor(card, templateSelector) {
    this._name = card.name;
    this._src = card.link;
    this._alt = card.name;
    this._templateSelector = templateSelector;
  }


  _getTemplate() {   
    const cardElement = this._templateSelector.querySelector('.place').cloneNode(true);

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
    const photo = popupPhoto.querySelector('.picture__view');
    photo.src = this._src;
    photo.alt = this._alt;
    popupPhoto.querySelector('.picture__name').textContent = this._name;
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
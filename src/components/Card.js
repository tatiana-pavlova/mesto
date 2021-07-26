export default class Card {
  constructor({card, userId, template, handleCardClick, likeClick, dislikeClick, handleDeleteClick}) {
    this._card = card;
    this._name = card.name;
    this._src = card.link;
    this._alt = card.name;
    this._cardOwnerId = card.owner._id;
    this._likes = card.likes;
    this._userId = userId;
    this._likeAmount = card.likes.length;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._likeClick = likeClick;
    this._dislikeClick = dislikeClick;
    this._handleDeleteClick = handleDeleteClick;
    
  }

  _getTemplate() {   
    const cardElement = this._template.querySelector('.place').cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => { this._handleLikeClick() });
    this._deleteButton.addEventListener ('click', () => { this._handleDeleteClick()});
    this._imageElement.addEventListener ('click', () => { this._handleCardClick (this._card) });
  }

  //доделать функцию
  _handleLikeClick () {
    if (this._likeButton.classList.contains('place__like_active')) {
      this._dislikeClick();
    } else {
      this._likeClick();
    }
    this._likeButton.classList.toggle('place__like_active');
    this._likeCounter.textContent = this._likeAmount;
  }

  
  deleteCardElement () {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate(); 
    this._titleElement = this._element.querySelector('.place__name');
    this._imageElement = this._element.querySelector('.place__pic');
    this._likeButton = this._element.querySelector('.place__like');
    this._deleteButton = this._element.querySelector('.place__delete');
    this._likeCounter = this._element.querySelector('.place__like-counter');
    
    

    
    this._setEventListeners();
    this._deleteButton.classList.add((this._userId === this._cardOwnerId)? 'place__delete_visible' : 'place__delete_hidden');
    this._card.likes.forEach((user) => {
      if (user._id.contains(this._userId)) {
        this._likeButton.classList.add('place__like_active');
      }
    });
    //не работает
    // if (this._card.likes._id.includes(this._userId)) {
    //   this._likeButton.classList.add('place__like_active');
    // }
    
    this._titleElement.textContent = this._name;
    this._imageElement.src = this._src;
    this._imageElement.alt = this._alt;
    this._likeCounter.textContent = this._likeAmount;

    return this._element;
  }

  
}
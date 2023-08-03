export const popupPlaceFull = document.querySelector('#popup-place-full');
export const popupPlaceFullImage = popupPlaceFull.querySelector('#card-image');
export const popupPlaceFullTitle = popupPlaceFull.querySelector('.popup__image-title');
export const placeTitleInput = document.querySelector('#form__item-placetitle');
export const placeLinkInput = document.querySelector('#form__item-placelink');
export const cardContainerUserAdd = document.querySelector('.places');
export class Card {
    constructor({data ,handleCardClick}, selector, newNewArr,userID,api) {
        this._selector = selector
        this._name = data.name
        this._link = data.link
        this._likes = data.likes.length
        this._likeUserID = newNewArr
        this._id = data.owner._id
        this._cardID = data._id
        this._handleCardClick = handleCardClick
        this._userID= userID
        this._api = api
    }
    _getElement() {
        const cardElement = document.
            querySelector(this._selector)
            .content
            .querySelector('.card')
            .cloneNode(true)
        return cardElement
    }
    generate() {
        this._element = this._getElement();
        this._element.querySelector('.card__image').src = this._link;
        this._element.querySelector('.card__title').textContent = this._name
        this._element.querySelector('.card__image').alt = this._name
        this._element.querySelector('.card__like-sum').textContent = this._likes
        this._setEventListeners()
        this._checkAuthorCard()
        this._checkLikeCard()

        return this._element
    }
    _checkAuthorCard() {
        if (this._id === this._userID) {
            this._element.querySelector('.card__trash').classList.add('card__trash_visible');
        };
    }
    _checkLikeCard() {
        if (this._likeUserID) {
            this._element.querySelector('.card__button').classList.add('card__button_checked');
        };
    }
    LikeCard(evt) {
        if (evt.target.classList.contains('card__button_checked')) {
            this._api.deleteLike(this._cardID)
                .then((res) => {
                    evt.target.classList.remove('card__button_checked');
                    this._element.querySelector('.card__like-sum').textContent = res.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            this._api.sendLike(this._cardID)
                .then((res) => {
                    evt.target.classList.add('card__button_checked');
                    this._element.querySelector('.card__like-sum').textContent = res.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
    deletCard(evt) {
        this._api.deleteCards(this._cardID)
            .then(() => {
                evt.target.closest('.card').remove();
            }).catch((err) => {
                console.log(err);
            });
    }
    
    _setEventListeners() {
        this._element.querySelector('.card__button').addEventListener('click',  (evt) => {
            this.LikeCard(evt)
        })
        this._element.querySelector('.card__trash').addEventListener('click',  (evt)=> {
            this.deletCard(evt)
        })
        this._element.querySelector('.card__image').addEventListener('click',  (evt) =>{
            this._handleCardClick(evt)
        })
    }

}






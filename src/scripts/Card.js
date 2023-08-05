
export class Card {
    constructor({ data, handleCardClick }, selector, newNewArr, userID) {
        this._selector = selector
        this._name = data.name
        this._link = data.link
        this._likes = data.likes.length
        this._likeUserID = newNewArr
        this._id = data.owner._id
        this._cardID = data._id
        this._handleCardClick = handleCardClick
        this._userID = userID
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
        this._checkAuthorCard()
        this._checkLikeCard()
        this._setEventListeners()

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
    LikeCard(evt,res) {
        if (evt.target.classList.contains('card__button_checked')) {
            evt.target.classList.remove('card__button_checked');
            this._element.querySelector('.card__like-sum').textContent = res.likes.length;
        } else {
            evt.target.classList.add('card__button_checked');
            this._element.querySelector('.card__like-sum').textContent = res.likes.length;
        }
    }
    deletCard() {
        this._element.remove();
        this._element = null
    }

    _setEventListeners() {
        this._element.querySelector('.card__image').addEventListener('click', (evt) => {
            this._handleCardClick(evt)
        })
    }

}






export const popupPlaceFull = document.querySelector('#popup-place-full');
export const popupPlaceFullImage = popupPlaceFull.querySelector('#card-image');
export const popupPlaceFullTitle = popupPlaceFull.querySelector('.popup__image-title');
export const placeTitleInput = document.querySelector('#form__item-placetitle');
export const placeLinkInput = document.querySelector('#form__item-placelink');
export const cardContainerUserAdd = document.querySelector('.places');
import { userID, api } from "../index.js";
import { openPopup } from "./modal";
export class Card {
    constructor(data, selector, newNewArr) {
        this._selector = selector
        this._name = data.name
        this._link = data.link
        this._likes = data.likes.length
        this._likeUserID = newNewArr
        this._id = data.owner._id
        this._cardID = data._id
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
        this._element.querySelector('.card__image').alt = this._link
        this._element.querySelector('.card__like-sum').textContent = this._likes
        this._setEventListeners()
        this._checkAuthorCard()
        this._checkLikeCard()

        return this._element
    }
    _checkAuthorCard() {
        if (this._id === userID) {
            this._element.querySelector('.card__trash').classList.add('card__trash_visible');
        };
    }
    _checkLikeCard() {
        if (this._likeUserID) {
            this._element.querySelector('.card__button').classList.add('card__button_checked');
        };
    }
    _LikeCard(evt) {
        if (evt.target.classList.contains('card__button_checked')) {
            api.deleteLike(this._cardID)
                .then((res) => {
                    evt.target.classList.remove('card__button_checked');
                    this._element.querySelector('.card__like-sum').textContent = res.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            api.sendLike(this._cardID)
                .then((res) => {
                    evt.target.classList.add('card__button_checked');
                    this._element.querySelector('.card__like-sum').textContent = res.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
    _deletCard(evt) {
        api.deleteCards(this._cardID)
            .then(() => {
                evt.target.closest('.card').remove();
            }).catch((err) => {
                console.log(err);
            });
    }
    _OpenPopup(evt) {
        openPopup(popupPlaceFull);
        popupPlaceFullImage.src = evt.target.src;
        popupPlaceFullTitle.textContent = evt.target.alt;
        popupPlaceFullImage.alt = evt.target.alt;
    }
    _setEventListeners() {
        this._element.querySelector('.card__button').addEventListener('click',  (evt) => {
            this._LikeCard(evt)
        })
        this._element.querySelector('.card__trash').addEventListener('click',  (evt)=> {
            this._deletCard(evt)
        })
        this._element.querySelector('.card__image').addEventListener('click',  (evt) =>{
            this._OpenPopup(evt)
        })
    }

}
// export const createCard = (cardTitleInput, cardImageInput, cardLikes, id, cardID, likeUserID) => {
//     const cardTemplateUserAdd = document.querySelector('#card').content;
//     const cardElementUserAdd = cardTemplateUserAdd.querySelector('.card').cloneNode(true);
//     const cardTrash = cardElementUserAdd.querySelector('.card__trash');
//     cardElementUserAdd.querySelector('.card__image').src = cardImageInput;
//     cardElementUserAdd.querySelector('.card__title').textContent = cardTitleInput;
//     cardElementUserAdd.querySelector('.card__image').alt = cardTitleInput;
//     cardElementUserAdd.querySelector('.card__like-sum').textContent = cardLikes;
//     if (id === userID) {
//         cardTrash.classList.add('card__trash_visible');
//     };
//     if (likeUserID) {
//         cardElementUserAdd.querySelector('.card__button').classList.add('card__button_checked');
//     };
//     cardElementUserAdd.querySelector('.card__button').addEventListener('click', function (evt) {
//         if (evt.target.classList.contains('card__button_checked')) {
//             api.deleteLike(cardID)
//                 .then((res) => {
//                     evt.target.classList.remove('card__button_checked');
//                     cardElementUserAdd.querySelector('.card__like-sum').textContent = res.likes.length;
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 })
//         } else {
//             api.sendLike(cardID)
//                 .then((res) => {
//                     evt.target.classList.add('card__button_checked');
//                     cardElementUserAdd.querySelector('.card__like-sum').textContent = res.likes.length;
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 })
//         }

//     });

//     cardTrash.addEventListener('click', function (evt) {
//         api.deleteCards(cardID)
//             .then(() => {
//                 evt.target.closest('.card').remove();
//             }).catch((err) => {
//                 console.log(err);
//             });

//     });
//     cardElementUserAdd.querySelector('.card__image').addEventListener('click', function (evt) {

//         openPopup(popupPlaceFull);
//         popupPlaceFullImage.src = evt.target.src;
//         popupPlaceFullTitle.textContent = evt.target.alt;
//         popupPlaceFullImage.alt = evt.target.alt;

//     });

//     return cardElementUserAdd;

// }






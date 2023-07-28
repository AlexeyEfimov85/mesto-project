export const popupPlaceFull = document.querySelector('#popup-place-full');
export const popupPlaceFullImage = popupPlaceFull.querySelector('#card-image');
export const popupPlaceFullTitle = popupPlaceFull.querySelector('.popup__image-title');
export const placeTitleInput = document.querySelector('#form__item-placetitle');
export const placeLinkInput = document.querySelector('#form__item-placelink');
export const cardContainerUserAdd = document.querySelector('.places');
import { userID } from "../index.js";
import { openPopup } from "./modal";
import { deleteCards, sendLike, deleteLike } from "./api";
 export class Card {
    
 }
export const createCard = (cardTitleInput, cardImageInput, cardLikes, id, cardID, likeUserID) => {
    const cardTemplateUserAdd = document.querySelector('#card').content;
    const cardElementUserAdd = cardTemplateUserAdd.querySelector('.card').cloneNode(true);
    const cardTrash = cardElementUserAdd.querySelector('.card__trash');
    cardElementUserAdd.querySelector('.card__image').src = cardImageInput;
    cardElementUserAdd.querySelector('.card__title').textContent = cardTitleInput;
    cardElementUserAdd.querySelector('.card__image').alt = cardTitleInput;
    cardElementUserAdd.querySelector('.card__like-sum').textContent = cardLikes;
    if (id === userID) {
        cardTrash.classList.add('card__trash_visible');
    };
    if (likeUserID) {
        cardElementUserAdd.querySelector('.card__button').classList.add('card__button_checked');
    };
    cardElementUserAdd.querySelector('.card__button').addEventListener('click', function (evt) {
        if (evt.target.classList.contains('card__button_checked')) {
            deleteLike(cardID)
                .then((res) => {
                    evt.target.classList.remove('card__button_checked');
                    cardElementUserAdd.querySelector('.card__like-sum').textContent = res.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            sendLike(cardID)
                .then((res) => {
                    evt.target.classList.add('card__button_checked');
                    cardElementUserAdd.querySelector('.card__like-sum').textContent = res.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                })
        }

    });

    cardTrash.addEventListener('click', function (evt) {
        deleteCards(cardID)
            .then(() => {
                evt.target.closest('.card').remove();
            }).catch((err) => {
                console.log(err);
            });


    });
    cardElementUserAdd.querySelector('.card__image').addEventListener('click', function (evt) {

        openPopup(popupPlaceFull);
        popupPlaceFullImage.src = evt.target.src;
        popupPlaceFullTitle.textContent = evt.target.alt;
        popupPlaceFullImage.alt = evt.target.alt;

    });

    return cardElementUserAdd;

}






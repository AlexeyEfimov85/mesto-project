export const popupPlaceFull = document.querySelector('#popup-place-full');
export const popupPlaceFullImage = popupPlaceFull.querySelector('#card-image');
export const popupPlaceFullTitle = popupPlaceFull.querySelector('.popup__image-title');
export const placeTitleInput = document.querySelector('#form__item-placetitle');
export const placeLinkInput = document.querySelector('#form__item-placelink');
export const cardContainerUserAdd = document.querySelector('.places');
export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
import { openPopup } from "./modal";
import { deleteCards, sendLike, deleteLike, renderCard } from "./api";

export const createCard = (cardTitleInput, cardImageInput, cardLikes, id, cardID, likeUserID) => {
    const cardTemplateUserAdd = document.querySelector('#card').content;
    const cardElementUserAdd = cardTemplateUserAdd.querySelector('.card').cloneNode(true);
    const cardTrash = cardElementUserAdd.querySelector('.card__trash');
    cardElementUserAdd.querySelector('.card__image').src = cardImageInput;
    cardElementUserAdd.querySelector('.card__title').textContent = cardTitleInput;
    cardElementUserAdd.querySelector('.card__image').alt = cardTitleInput;
    cardElementUserAdd.querySelector('.card__like-sum').textContent = cardLikes;
    if (id === '509490c5246b53b1359effd9') {
        cardTrash.classList.add('card__trash_visible');
    };
    if (likeUserID) {
        cardElementUserAdd.querySelector('.card__button').classList.add('card__button_checked');
    };
    cardElementUserAdd.querySelector('.card__button').addEventListener('click', function (evt) {
        if (evt.target.classList.contains('card__button_checked')) {
            deleteLike(cardID)
                .then(() => {
                    evt.target.classList.remove('card__button_checked');
                }).finally(() => {
                    cardElementUserAdd.querySelector('.card__like-sum').textContent = cardLikes - 1;
                    cardLikes = cardLikes - 1;
                })
        } else {
            sendLike(cardID)
                .then(() => {
                    evt.target.classList.add('card__button_checked');
                }).finally(() => {
                    cardElementUserAdd.querySelector('.card__like-sum').textContent = cardLikes + 1;
                    cardLikes = cardLikes + 1;
                })
        }

    });

    cardTrash.addEventListener('click', function (evt) {
        evt.target.closest('.card').remove();
        deleteCards(cardID);
    });
    cardElementUserAdd.querySelector('.card__image').addEventListener('click', function (evt) {

        openPopup(popupPlaceFull);
        popupPlaceFullImage.src = evt.target.src;
        popupPlaceFullTitle.textContent = evt.target.alt;
        popupPlaceFullImage.alt = evt.target.alt;

    });

    return cardElementUserAdd;

}

/*export function renderCard() {
    const cards = createCard(placeTitleInput.value, placeLinkInput.value);
    createCard(placeTitleInput.value, placeLinkInput.value);
    //cardContainerUserAdd.prepend(cards);
}*/




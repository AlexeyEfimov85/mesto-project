//import { popupPlaceFull } from "./scripts/cards.js";
export const formProfileEdit = document.querySelector('#form-profile');
export const popupCreateNewCard = document.querySelector('#popup-place');
export const popupProfile = document.querySelector('#popup-edit-profile');
export const buttonOpenPopupCreateCard = document.querySelector('.profile__button-create');
export const buttonClosePopupCreateNewCard = document.querySelector('.popup__toggle_create-new-card');
export const formElementPlace = document.querySelector('#form-place');
export const buttonEdit = document.querySelector('.profile__button-edit');
export const buttonPopupProfileToggle = popupProfile.querySelector('.popup__toggle');
export const popupPlaceFull = document.querySelector('#popup-place-full');
export const buttonPlaceFullToggle = popupPlaceFull.querySelector('.popup__toggle');
export const nameInput = formProfileEdit.querySelector('#form__item-username');
export const jobInput = formProfileEdit.querySelector('#form__item-userjob');

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
};

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

const closeByEsc = function (evt) {
    const popup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
        closePopup(popup);
    }
    document.removeEventListener('keydown', closeByEsc);
};

export const closeByClickOverlay = function (evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(popupPlaceFull);
    }
};
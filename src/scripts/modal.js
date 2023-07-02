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
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = formProfileEdit.querySelector('#form__item-username');
const jobInput = formProfileEdit.querySelector('#form__item-userjob');

import { renderCard, placeTitleInput, placeLinkInput } from "./cards";
export function openPopup(popup) {
    popup.classList.add('popup_opened');
};

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

export function formPlaceSubmitHandler(evt) {
    evt.preventDefault();
    renderCard();
    closePopup(popupCreateNewCard);
    placeTitleInput.value = '';
    placeLinkInput.value = '';
}

export function addformProfileEditNamePlaceholder() {
    nameInput.value = document.querySelector('.profile__title').textContent;
};
export function addformProfileEditJobPlaceholder() {
    jobInput.value = document.querySelector('.profile__description').textContent;
};

export function formProfileEditSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupProfile);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}
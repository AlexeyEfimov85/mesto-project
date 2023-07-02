import './pages/index.css';

import { initialCards, createCard, renderCard, cardContainerUserAdd } from "./scripts/cards.js";
import {
    openPopup, closePopup, formPlaceSubmitHandler, popupCreateNewCard, addformProfileEditNamePlaceholder,
    addformProfileEditJobPlaceholder, formProfileEditSubmitHandler, formProfileEdit, popupProfile, buttonOpenPopupCreateCard,
    buttonClosePopupCreateNewCard, formElementPlace, buttonEdit, buttonPopupProfileToggle, popupPlaceFull, buttonPlaceFullToggle
} from './scripts/modal';
import { enableValidation } from './scripts/validate';

initialCards.forEach(item => {
    cardContainerUserAdd.append(createCard(item.name, item.link));
});

buttonPlaceFullToggle.addEventListener('click', function () {
    closePopup(popupPlaceFull);
});

popupPlaceFull.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(popupPlaceFull);
      }
});
document.addEventListener('keydown', function (evt) {
    if(evt.key === 'Escape'){ 
        closePopup(popupPlaceFull);}
});
buttonOpenPopupCreateCard.addEventListener('click', function () {
    openPopup(popupCreateNewCard);
});
buttonClosePopupCreateNewCard.addEventListener('click', function () {
    closePopup(popupCreateNewCard);
});
popupCreateNewCard.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(popupCreateNewCard);
      }
});
document.addEventListener('keydown', function (evt) {
    if(evt.key === 'Escape'){ 
        closePopup(popupCreateNewCard);}
});
buttonEdit.addEventListener('click', function () {
    openPopup(popupProfile);
    addformProfileEditNamePlaceholder();
    addformProfileEditJobPlaceholder();
});
buttonPopupProfileToggle.addEventListener('click', function () {
    closePopup(popupProfile);
});
popupProfile.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(popupProfile);
      }
});
document.addEventListener('keydown', function (evt) {
    if(evt.key === 'Escape'){ 
        closePopup(popupProfile);}
});
formProfileEdit.addEventListener('submit', formProfileEditSubmitHandler);
formElementPlace.addEventListener('submit', formPlaceSubmitHandler);
enableValidation(); 
import './pages/index.css';

import { initialCards, createCard, renderCard, cardContainerUserAdd, placeTitleInput, placeLinkInput } from "./scripts/cards.js";
import {
    openPopup, closePopup, popupCreateNewCard, nameInput, jobInput, formProfileEdit, popupProfile, 
    buttonOpenPopupCreateCard, buttonClosePopupCreateNewCard, formElementPlace, buttonEdit, buttonPopupProfileToggle, 
    popupPlaceFull, buttonPlaceFullToggle, closeByClickOverlay
} from './scripts/modal';
import { enableValidation, objTuneValidation, setButtonState } from './scripts/validate';

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

initialCards.forEach(item => {
    cardContainerUserAdd.append(createCard(item.name, item.link));
});
function addProfileInfoSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupProfile);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
};
function addNewPlaceSubmitHandler(evt) {
    evt.preventDefault();
    renderCard();
    closePopup(popupCreateNewCard);
    setButtonState(objTuneValidation);
    placeTitleInput.value = '';
    placeLinkInput.value = '';
}

function addformProfileEditNamePlaceholder() {
    nameInput.value = document.querySelector('.profile__title').textContent;
};
function addformProfileEditJobPlaceholder() {
    jobInput.value = document.querySelector('.profile__description').textContent;
};


buttonPlaceFullToggle.addEventListener('click', function () {
    closePopup(popupPlaceFull);
});

popupPlaceFull.addEventListener('click', closeByClickOverlay);

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
formProfileEdit.addEventListener('submit', addProfileInfoSubmitHandler);
formElementPlace.addEventListener('submit', addNewPlaceSubmitHandler);

enableValidation(objTuneValidation); 



import './pages/index.css';
import {formProfileEdit} from './scripts/util.js'
import { initialCards, createCard, renderCard, cardContainerUserAdd, placeTitleInput, placeLinkInput, cardTrash } from "./scripts/cards.js";
import {
    openPopup, closePopup, popupCreateNewCard, nameInput, jobInput, popupProfile, 
    buttonOpenPopupCreateCard, buttonClosePopupCreateNewCard, formElementPlace, buttonEdit, buttonPopupProfileToggle, 
    popupPlaceFull, buttonPlaceFullToggle, closeByClickOverlay, renderLoading
} from './scripts/modal';
import { enableValidation, objTuneValidation, setButtonState } from './scripts/validate';
import { getCards, getProfileData, renderProfileData, addCardToServer, getCardsLikeNumber, deleteCards, sendLike, deleteLike, getlikesID, getProfileAvatar, renderProfileAvatar, userID } from './scripts/api.js';


const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');
const popupProfileAvatar = document.querySelector('#popup-profile-foto');
const buttonClosePopupProfileAvatar = document.querySelector('.popup__toggle_profile-foto');
const avatarInput  = document.querySelector('#form__item-avatarlink');
const formAvatarEdit = document.querySelector('#form-profile-foto');


function addProfileAvatarSubmitHandler(evt) {
    evt.preventDefault();
    renderLoading(true);
    const avatar = {
        avatar: avatarInput.value
    };
    renderProfileAvatar(avatar)
    .then (() => {
        closePopup(popupProfileAvatar)
        avatarInput.value = '';
    })
    .finally (() => {
        renderLoading(false);
    })

}

function addProfileInfoSubmitHandler(evt) {
    evt.preventDefault();
    renderLoading(true);
    const profile = {
        name: nameInput.value,
        about: jobInput.value
      };
    renderProfileData(profile);
    getProfileData()
    .then (() => {
        closePopup(popupProfile);
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileDescription.textContent
    })
    .finally (() => {
        renderLoading(false);
    })
    
};
function addNewPlaceSubmitHandler(evt) {
    evt.preventDefault();
    renderLoading(true);
    const cardData = {
        name: placeTitleInput.value,
        link: placeLinkInput.value
    }
    addCardToServer(cardData)
    .then (() => {
        closePopup(popupCreateNewCard);
        setButtonState(objTuneValidation);
        placeTitleInput.value = '';
        placeLinkInput.value = '';
    })
    .finally (() => {
        renderLoading(false);
    })

}

function addNameInputValue() {
    nameInput.value = document.querySelector('.profile__title').textContent;
};
function addJobInputValue() {
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
    addNameInputValue();
    addJobInputValue();
});
buttonPopupProfileToggle.addEventListener('click', function () {
    closePopup(popupProfile);
});
popupProfile.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(popupProfile);
    }
});

profileAvatar.addEventListener('click', function () {
    openPopup(popupProfileAvatar);
});
popupProfileAvatar.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(popupProfileAvatar);
    }
});
buttonClosePopupProfileAvatar.addEventListener('click', function () {
    closePopup(popupProfileAvatar);
});

formProfileEdit.addEventListener('submit', addProfileInfoSubmitHandler);
formElementPlace.addEventListener('submit', addNewPlaceSubmitHandler);
formAvatarEdit.addEventListener('submit', addProfileAvatarSubmitHandler);

enableValidation(objTuneValidation); 
getCards();
getProfileData();




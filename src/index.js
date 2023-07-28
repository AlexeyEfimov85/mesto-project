import './pages/index.css';
import { formProfileEdit } from './scripts/util.js'
import { placeTitleInput, placeLinkInput, cardContainerUserAdd, createCard } from "./scripts/cards.js";
import {
    openPopup, closePopup, popupCreateNewCard, nameInput, jobInput, popupProfile,
    buttonOpenPopupCreateCard, buttonClosePopupCreateNewCard, formElementPlace, buttonEdit, buttonPopupProfileToggle,
    popupPlaceFull, buttonPlaceFullToggle, closeByClickOverlay, renderLoading, profileTitle, profileDescription,
    profileAvatar, popupProfileAvatar, buttonClosePopupProfileAvatar, avatarInput, formAvatarEdit, profileAva
} from './scripts/modal';
import { enableValidation, setButtonState } from './scripts/validate';
import { Api } from './scripts/api.js';
export let userID;

export const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26/',
    headers: {
      authorization: 'dff808ff-3720-4dec-bd88-6c3aa62f954a',
      'Content-Type': 'application/json',
    }
  }); 
  
 
Promise.all([api.getCards(), api.getProfileData()])
    .then(([initialCards, profileData]) => {
        profileTitle.textContent = profileData.name;
        profileDescription.textContent = profileData.about
        profileAva.src = profileData.avatar;
        userID = profileData._id
        initialCards.forEach(item => {
            const arr = item.likes;
            const newArr = arr.map(userid => {
                return userid._id;
            })
            const newNewArr = newArr.some(myId => {
                return myId === userID
            })
            cardContainerUserAdd.append(createCard(item.name, item.link, item.likes.length, item.owner._id, item._id, newNewArr));
        });
    })
    .catch((err) => {
        console.log(err);
    });

function addProfileAvatarSubmitHandler(evt) {
    evt.preventDefault();
    renderLoading(true);
    const avatar = {
        avatar: avatarInput.value
    };
    api.renderProfileAvatar(avatar)
        .then((profileData) => {
            profileAva.src = profileData.avatar;
        })
        .then(() => {
            closePopup(popupProfileAvatar);
            setButtonState();
            evt.target.reset();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
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
    api.renderProfileData(profile)
        .then((profileData) => {
            profileTitle.textContent = profileData.name;
            profileDescription.textContent = profileData.about
            profileAva.src = profileData.avatar;
        })
        .catch((err) => {
            console.log(err);
        });
    api.getProfileData()
        .then(() => {
            closePopup(popupProfile);
            setButtonState();
            evt.target.reset();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
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
    api.addCardToServer(cardData)
        .then((cardData) => {
            cardContainerUserAdd.prepend(createCard(cardData.name, cardData.link, cardData.likes.length, cardData.owner._id, cardData._id));
        })
        .then(() => {
            closePopup(popupCreateNewCard);
            setButtonState();
            evt.target.reset();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false);
        })
}

function addNameInputValue() {
    nameInput.value = profileTitle.textContent;
};
function addJobInputValue() {
    jobInput.value = profileDescription.textContent;
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

enableValidation({
    formList: '.form',
    inputList: '.form__item',
    buttonElement: '.form__button',
    buttonDisabled: 'form__button_inactive',
    inputError: 'form__item_type_error',
    errorElement: 'form__item-username-error_active'
  });





import './pages/index.css';
import { formProfileEdit, tuneValidation } from './scripts/util.js'
import { placeTitleInput, placeLinkInput, cardContainerUserAdd, Card } from "./scripts/cards.js";
import {
    openPopup, closePopup, popupCreateNewCard, nameInput, jobInput, popupProfile,
    buttonOpenPopupCreateCard, buttonClosePopupCreateNewCard, formElementPlace, buttonEdit, buttonPopupProfileToggle,
    popupPlaceFull, buttonPlaceFullToggle, closeByClickOverlay, renderLoading, profileTitle, profileDescription,
    profileAvatar, popupProfileAvatar, buttonClosePopupProfileAvatar, avatarInput, formAvatarEdit, profileAva
} from './scripts/modal';
import { FormValidator } from './scripts/FormValidator';
import { Api } from './scripts/api.js';
import Section from "./scripts/section.js";
import PopupWithForm from './scripts/PopupWithForm';
import { UserInfo } from './scripts/userInfo';
export let userID;
export const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26/',
    headers: {
        authorization: 'dff808ff-3720-4dec-bd88-6c3aa62f954a',
        'Content-Type': 'application/json',
    }
})

const userInfo = new UserInfo({ selectorName: '.profile__title', selectorDescription: '.profile__description' })
Promise.all([api.getCards(), userInfo.getUserInfo()])
    .then(([initialCards, profileData]) => {
        const profile = new Section({
            items: profileData,
            renderer: (item) => {
                profileTitle.textContent = item.name;
                profileDescription.textContent = item.about
                profileAva.src = item.avatar;
            }
        })
        userID = profileData._id
        const placesList = new Section({
            items: initialCards,
            renderer: (item) => {
                const arr = item.likes;
                const newArr = arr.map(userid => {
                    return userid._id;
                })
                const newNewArr = newArr.some(myId => {
                    return myId === userID
                })
                const card = new Card(item, '#card', newNewArr)
                const cardElement = card.generate()
                placesList.addItem(cardElement)
            }
        }, '.places')
        placesList.renderItems()
        profile.renderItems()
    })
    .catch((err) => {
        console.log(err);
    });

function addProfileAvatarSubmitHandler(data) {
    renderLoading(true);
    const avatar = {
        avatar: data[0]
    };
    api.renderProfileAvatar(avatar)
        .then((profileData) => {
            const profile = new Section({
                items: profileData,
                renderer: () => {
                    profileAva.src = profileData.avatar;
                }
            })
            profile.renderItems()
        })
        .then(() => {
            closePopup(popupProfileAvatar);
            formValidatorProfilePhoto.setButtonState();
            formAvatarEdit.reset();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false);
        })

}

function addProfileInfoSubmitHandler(data) {
    renderLoading(true);
    const profile = {
        name: data[0],
        about: data[1]
    };
    userInfo.setUserInfo(profile)
    userInfo.getUserInfo()
        .then(() => {
            closePopup(popupProfile);
            formValidatorProfile.setButtonState();
            formProfileEdit.reset();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false);
        })

};
function addNewPlaceSubmitHandler(data) {
    renderLoading(true);
    const cardData = {
        name: data[0],
        link: data[1]
    }
    api.addCardToServer(cardData)
        .then(() => {
            api.getCards()
                .then((initialCards) => {
                    const placesList = new Section({
                        items: initialCards,
                        renderer: (item) => {
                            const arr = item.likes;
                            const newArr = arr.map(userid => {
                                return userid._id;
                            })
                            const newNewArr = newArr.some(myId => {
                                return myId === userID
                            })
                            const card = new Card(item, '#card', newNewArr)
                            const cardElement = card.generate()
                            placesList.addItem(cardElement)
                        }
                    }, '.places')
                    placesList.renderItems()
                })
        })
        .then(() => {
            closePopup(popupCreateNewCard);
            formValidatorPlace.setButtonState();
            formElementPlace.reset();
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
    popupElementPlace.open();
});


buttonEdit.addEventListener('click', function () {
    popupProfileEdit.open();
    addNameInputValue();
    addJobInputValue();
});

profileAvatar.addEventListener('click', function () {
    popupAvatarEdit.open();
});

const popupProfileEdit = new PopupWithForm(popupProfile, addProfileInfoSubmitHandler);
const popupElementPlace = new PopupWithForm(popupCreateNewCard, addNewPlaceSubmitHandler);
const popupAvatarEdit = new PopupWithForm(popupProfileAvatar, addProfileAvatarSubmitHandler);
popupProfileEdit.setEventListeners();
popupElementPlace.setEventListeners();
popupAvatarEdit.setEventListeners();

const formValidatorProfile = new FormValidator(tuneValidation, formProfileEdit);
const formValidatorPlace = new FormValidator(tuneValidation, formElementPlace);
const formValidatorProfilePhoto = new FormValidator(tuneValidation, formAvatarEdit);
formValidatorProfile.enableValidation();
formValidatorPlace.enableValidation();
formValidatorProfilePhoto.enableValidation()

api.getCards()
    .then((result) => {
        console.log(result)
    })

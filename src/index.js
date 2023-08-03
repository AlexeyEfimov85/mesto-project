import './pages/index.css';
import { formProfileEdit, tuneValidation } from './scripts/util.js'
import { placeTitleInput, placeLinkInput, cardContainerUserAdd, Card } from "./scripts/Card.js";
import {
    openPopup, closePopup, popupCreateNewCard, nameInput, jobInput, popupProfile,
    buttonOpenPopupCreateCard, buttonClosePopupCreateNewCard, formElementPlace, buttonEdit, buttonPopupProfileToggle,
    popupPlaceFull, buttonPlaceFullToggle, closeByClickOverlay, renderLoading, profileTitle, profileDescription,
    profileAvatar, popupProfileAvatar, buttonClosePopupProfileAvatar, avatarInput, formAvatarEdit, profileAva
} from './scripts/modal';
import { enableValidation, setButtonState, FormValidator } from './scripts/validate';
import { Api } from './scripts/api.js';
import Section from "./scripts/section.js";
import PopupWithForm from './scripts/PopupWithForm';
import { UserInfo } from './scripts/userInfo';
import PopupWithImage from './scripts/PopupWithImage';
export let userID;
export const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26/',
    headers: {
        authorization: 'dff808ff-3720-4dec-bd88-6c3aa62f954a',
        'Content-Type': 'application/json',
    }
})
let placesList = null
const userInfo =new UserInfo({selectorName: '.profile__title',selectorDescription : '.profile__description'})
Promise.all([api.getCards(),api.getProfileData()])
    .then(([initialCards, profileData]) => {
        const profile = new Section({
            items: userInfo.getUserInfo(profileData),
            renderer: (item) =>{
                profileTitle.textContent = item.name;
                profileDescription.textContent = item.about
                profileAva.src = item.avatar;
            }
        })
        userID = profileData._id   
      placesList = new Section({
            items: initialCards,
            renderer: (item) => {
                const arr = item.likes;
                const newArr = arr.map(userid => {
                    return userid._id;
                })
                const newNewArr = newArr.some(myId => {
                    return myId === userID
                })
                const card = new Card({data: item,handleCardClick: ()=>{
                    const Popup = new PopupWithImage(popupPlaceFull);
                   Popup.open(item.link,item.name)
                } }, '#card', newNewArr,profileData._id,api)
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
function addProfileAvatarSubmitHandler(evt) {
    evt.preventDefault();
    renderLoading(true);
    const avatar = {
        avatar: avatarInput.value
    };
    api.renderProfileAvatar(avatar)
    .then((profileData) => {
        const profile = new Section({items: profileData,
        renderer: ()=>{
        profileAva.src = profileData.avatar;
        }})
        profile.renderItems()
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
    userInfo.setUserInfo(profile)
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
        .then(() => {    
          console.log(placesList)
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
/*buttonClosePopupCreateNewCard.addEventListener('click', function () {
    closePopup(popupCreateNewCard);
});
popupCreateNewCard.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(popupCreateNewCard);
    }
});*/

buttonEdit.addEventListener('click', function () {
    popupProfileEdit.open();
    //openPopup(popupProfile);
    addNameInputValue();
    addJobInputValue();
});
/*buttonPopupProfileToggle.addEventListener('click', function () {
    closePopup(popupProfile);
});*/
/*popupProfile.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(popupProfile);
    }
});*/

profileAvatar.addEventListener('click', function () {
    openPopup(popupProfileAvatar);
});
/*popupProfileAvatar.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(popupProfileAvatar);
    }
});
buttonClosePopupProfileAvatar.addEventListener('click', function () {
    closePopup(popupProfileAvatar);
});*/

/*formProfileEdit.addEventListener('submit', addProfileInfoSubmitHandler);
formElementPlace.addEventListener('submit', addNewPlaceSubmitHandler);
formAvatarEdit.addEventListener('submit', addProfileAvatarSubmitHandler);*/

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
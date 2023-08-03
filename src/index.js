import './pages/index.css';
import { formProfileEdit, tuneValidation } from './scripts/util.js'
import { placeTitleInput, placeLinkInput, Card } from "./scripts/Card.js";
import {
    openPopup, closePopup, popupCreateNewCard, nameInput, jobInput, popupProfile,
    buttonOpenPopupCreateCard, buttonClosePopupCreateNewCard, formElementPlace, buttonEdit, buttonPopupProfileToggle,
    popupPlaceFull, buttonPlaceFullToggle, closeByClickOverlay, renderLoading, profileTitle, profileDescription,
    profileAvatar, popupProfileAvatar, buttonClosePopupProfileAvatar, avatarInput, formAvatarEdit, profileAva
} from './scripts/modal';
import { cardContainerUserAdd } from './scripts/constants';
import { FormValidator } from './scripts/FormValidator';
import { Api } from './scripts/api.js';
import Section from "./scripts/section.js";
import PopupWithForm from './scripts/PopupWithForm';
import { UserInfo } from './scripts/userInfo';
import PopupWithImage from './scripts/PopupWithImage';
 let userID;
 const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26/',
    headers: {
        authorization: 'dff808ff-3720-4dec-bd88-6c3aa62f954a',
        'Content-Type': 'application/json',
    }
})
let placesList = null
const userInfo = new UserInfo({ selectorName: '.profile__title', selectorDescription: '.profile__description',selectorAvatar: '.profile__avatar' })
Promise.all([api.getCards(), api.getProfileData()])
    .then(([initialCards, profileData]) => {
       userInfo.setUserInfo(profileData)
       userInfo.setUserAvatar(profileData.avatar)
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
    api.renderProfileData(profile).then((profileData) => {  
       userInfo.setUserInfo(profileData)
    })
    .catch((err) => {
        console.log(err);
    });

    api.getProfileData()
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

    }
function addNewPlaceSubmitHandler(data) {
    renderLoading(true);
    const cardData = {
        name: data[0],
        link: data[1]
    }
    api.addCardToServer(cardData)
        .then((result) => {
            const card = new Card({data: result,handleCardClick: ()=>{
                const Popup = new PopupWithImage(popupPlaceFull);
               Popup.open(cardData.link,cardData.name)
            } }, '#card', false,result.owner._id,api)
            const cardElement = card.generate()
            cardContainerUserAdd.prepend(cardElement)
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
    const Popup = new PopupWithImage(popupPlaceFull);
    Popup.close()
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

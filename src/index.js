import './pages/index.css';
import { formProfileEdit, tuneValidation } from './scripts/util.js'
import { Card } from "./scripts/Card.js";
import {
    cardContainerUserAdd, popupCreateNewCard, nameInput, jobInput, popupProfile,
    buttonOpenPopupCreateCard, formElementPlace, buttonEdit, popupPlaceFull, profileTitle, profileDescription,
    profileAvatar, popupProfileAvatar, formAvatarEdit, profileAva
} from './scripts/constants';
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
                const card = new Card({
                    data: item, handleCardClick: () => {
                        popupImage.open(item.link, item.name)

                    }
                }, '#card', newNewArr, profileData._id)
                const cardElement = card.generate()
                cardElement.querySelector('.card__trash').addEventListener('click', () => {
                    api.deleteCards(item._id)
                    .then(()=> card.deletCard())
                        .catch((err) => {
                            console.log(err);
                        });
                })
                cardElement.querySelector('.card__button').addEventListener('click', (evt) => {
                    if (evt.target.classList.contains('card__button_checked')) {
                        api.deleteLike(item._id)
                            .then((res) => {
                                card.LikeCard(evt, res)
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    } else {
                        api.sendLike(item._id)
                            .then((res) => {
                                card.LikeCard(evt, res)
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    }
                })
                placesList.addItem(cardElement)
            }
        }, '.places')
        placesList.renderItems()
    })
    .catch((err) => {
        console.log(err);
    });

const userInfo = new UserInfo({ selectorName: '.profile__title', selectorDescription: '.profile__description', selectorAvatar: '.profile__avatar' })
function addProfileAvatarSubmitHandler(data) {
    popupAvatarEdit.renderLoading(true, {a : 'Сохранение...', b : 'Сохранить'});
    const avatar = {
        avatar: data[0]
    };
    api.renderProfileAvatar(avatar)
        .then((profileData) => {
            userInfo.setUserInfo(profileData)
            popupAvatarEdit.close();
            formValidatorProfilePhoto.setButtonState();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupAvatarEdit.renderLoading(false, {a : 'Сохранение...', b : 'Сохранить'});
        })

}

function addProfileInfoSubmitHandler(data) {
    popupProfileEdit.renderLoading(true, {a : 'Сохранение...', b : 'Сохранить'});
    const profile = {
        name: data[0],
        about: data[1]
    };

    api.renderProfileData(profile).then((profileData) => {  
       userInfo.setUserInfo(profileData)
       popupProfileEdit.close();
       formValidatorProfile.setButtonState();
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        popupProfileEdit.renderLoading(false, {a : 'Сохранение...', b : 'Сохранить'});
    });

    }

function addNewPlaceSubmitHandler(data) {
    popupElementPlace.renderLoading(true, {a : 'Создание...', b : 'Создать'});
    const cardData = {
        name: data[0],
        link: data[1]
    }
    api.addCardToServer(cardData)
        .then((result) => {
            const card = new Card({
                data: result, handleCardClick: () => {
                    popupImage.open(cardData.link, cardData.name)
                }
            }, '#card', false, result.owner._id)
            const cardElement = card.generate();
            popupElementPlace.close();
            formValidatorPlace.setButtonState();

            cardElement.querySelector('.card__trash').addEventListener('click', () => {
                api.deleteCards(result._id)
                .then(()=> card.deletCard())
                    .catch((err) => {
                        console.log(err);
                    });
            })
            cardElement.querySelector('.card__button').addEventListener('click', (evt) => {
                if (evt.target.classList.contains('card__button_checked')) {
                    api.deleteLike(result._id)
                        .then((res) => {
                            card.LikeCard(evt, res)
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                } else {
                    api.sendLike(result._id)
                        .then((res) => {
                            card.LikeCard(evt, res)
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            })
            placesList.addItemToStart(cardElement)
        })
        
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupElementPlace.renderLoading(false, {a : 'Создание...', b : 'Создать'});
        })
}


buttonOpenPopupCreateCard.addEventListener('click', function () {
    popupElementPlace.open();
});


buttonEdit.addEventListener('click', function () {
    popupProfileEdit.open();

    nameInput.value = userInfo.getUserInfo().name
    jobInput.value = userInfo.getUserInfo().about

});

profileAvatar.addEventListener('click', function () {
    popupAvatarEdit.open();
});

const popupImage = new PopupWithImage(popupPlaceFull);
const popupProfileEdit = new PopupWithForm(popupProfile, addProfileInfoSubmitHandler);
const popupElementPlace = new PopupWithForm(popupCreateNewCard, addNewPlaceSubmitHandler);
const popupAvatarEdit = new PopupWithForm(popupProfileAvatar, addProfileAvatarSubmitHandler);
popupImage.setEventListeners();
popupProfileEdit.setEventListeners();
popupElementPlace.setEventListeners();
popupAvatarEdit.setEventListeners();

const formValidatorProfile = new FormValidator(tuneValidation, formProfileEdit);
const formValidatorPlace = new FormValidator(tuneValidation, formElementPlace);
const formValidatorProfilePhoto = new FormValidator(tuneValidation, formAvatarEdit);
formValidatorProfile.enableValidation();
formValidatorPlace.enableValidation();
formValidatorProfilePhoto.enableValidation()
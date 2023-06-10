const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cardContainer = document.querySelector('.places');
const cardContainerUserAdd = document.querySelector('.places');
let cardElementUserAdd = {}; //здесь точно нужно через let
const buttonOpenPopupCreateCard = document.querySelector('.profile__button-create');
const popupCreateNewCard = document.querySelector('#popup-place');
const buttonClosePopupCreateNewCard = document.querySelector('.popup__toggle_create-new-card');
const formElementPlace = document.querySelector('#form-place');
const placeTitleInput = document.querySelector('#place-title');
const placeLinkInput = document.querySelector('#place-link');
const buttonEdit = document.querySelector('.profile__button-edit');
const popupProfile = document.querySelector('#popup-edit-profile');
const buttonPopupProfileToggle = popupProfile.querySelector('.popup__toggle');
const formProfileEdit = document.querySelector('#form-profile');
const nameInput = formProfileEdit.querySelector('#user-name');
const jobInput = formProfileEdit.querySelector('#user-job');
const popupPlaceFull = document.querySelector('#popup-place-full');
const buttonPlaceFullToggle = popupPlaceFull.querySelector('.popup__toggle');
const popupPlaceFullImage = popupPlaceFull.querySelector('#card-image');
const popupPlaceFullTitle = popupPlaceFull.querySelector('.popup__image-title');


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

/*for (let i = 0; i < initialCards.length; i++) {
    createCard(initialCards[i].name, initialCards[i].link);
    cardContainerUserAdd.append(cardElementUserAdd);
};*/
initialCards.forEach(item => {
    cardContainerUserAdd.append(createCard(item.name, item.link));
});
/*const cardElements = []; //Тема 6/13: Создание, добавление и удаление элементов в DOM → Урок 4/10
//базовые карточки добавлены на страницу через скрипт


function initialCard() {
   
    for (let i = 0; i < initialCards.length; i++) {
        const cardTemplate = document.querySelector('#card').content;
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
        cardElement.querySelector('.card__image').src = initialCards[i].link;
        cardElement.querySelector('.card__title').textContent = initialCards[i].name;
        cardElement.querySelector('.card__image').alt = initialCards[i].name;
        cardElements[i] = cardElement;
        cardElement.querySelector('.card__button').addEventListener('click', function (evt) {
            evt.target.classList.toggle('card__button_checked');
        });
        
        const popupPlaceFull = document.querySelector('#popup-place-full');
        cardElement.querySelector('.card__trash').addEventListener('click', function (evt) {
            evt.target.closest('.card').remove();
        });
        cardElement.querySelector('.card__image').addEventListener('click', function () {
            popupPlaceFull.classList.toggle('popup_opened-place');
            popupPlaceFull.querySelector('#card-image').src = cardElement.querySelector('.card__image').src;
            popupPlaceFull.querySelector('.popup__image-title').textContent = cardElement.querySelector('.card__title').textContent;

        });


    }
    for (let i = 0; i < cardElements.length; i++) {
        cardContainer.append(cardElements[i]);
    }

}
initialCard();*/
// модальное окно добавления места

/*function placeCreate() {
    popupCreateNewCard.classList.toggle('popup_opened');
}*/

// добавление карточек и удаление добавленных карточек

function createCard(cardTitleInput, cardImageInput) {
    const cardTemplateUserAdd = document.querySelector('#card').content;
    cardElementUserAdd = cardTemplateUserAdd.querySelector('.card').cloneNode(true);
    cardElementUserAdd.querySelector('.card__image').src = cardImageInput;
    cardElementUserAdd.querySelector('.card__title').textContent = cardTitleInput;
    cardElementUserAdd.querySelector('.card__image').alt = cardTitleInput;

    //cardContainerUserAdd.prepend(cardElementUserAdd);
    cardElementUserAdd.querySelector('.card__button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__button_checked');
    });
    cardElementUserAdd.querySelector('.card__trash').addEventListener('click', function (evt) {
        evt.target.closest('.card').remove();
    });
    cardElementUserAdd.querySelector('.card__image').addEventListener('click', function (evt) {

        openPopup(popupPlaceFull);
        /*popupPlaceFull.querySelector('#card-image').src = cardElementUserAdd.querySelector('.card__image').src;
        popupPlaceFull.querySelector('.popup__image-title').textContent = cardElementUserAdd.querySelector('.card__title').textContent;*/ //этот код перестал работать после удаления функции initialCards и загрузки карточек через цикл
        /*popupPlaceFull.querySelector('#card-image').src = evt.target.src;
        popupPlaceFull.querySelector('.popup__image-title').textContent = evt.target.alt;
        popupPlaceFull.querySelector('#card-image').alt  = evt.target.alt;*/
        popupPlaceFullImage.src = evt.target.src;
        popupPlaceFullTitle.textContent = evt.target.alt;
        popupPlaceFullImage.alt = evt.target.alt;

    });

    return cardElementUserAdd;
}


function renderCard() {
    createCard(placeTitleInput.value, placeLinkInput.value);
    cardContainerUserAdd.prepend(cardElementUserAdd);
}
function formPlaceSubmitHandler(evt) {
    evt.preventDefault();
    renderCard();
    closePopup(popupCreateNewCard);
    placeTitleInput.value = '';
    placeLinkInput.value = '';
}



function openPopup(popup) {
    popup.classList.add('popup_opened');
};
function closePopup(popup) {
    popup.classList.remove('popup_opened');
};
/*function openPopupProfileEdit(popup) {
    popup.classList.add('popup_opened');

};
function closePopupProfileEdit(popup) {
    popup.classList.remove('popup_opened');
};*/



function addformProfileEditNamePlaceholder() {
    nameInput.value = document.querySelector('.profile__title').textContent;
};
function addformProfileEditJobPlaceholder() {
    jobInput.value = document.querySelector('.profile__description').textContent;
};
/*nameInput.placeholder = document.querySelector('.profile__title').textContent;
jobInput.placeholder = document.querySelector('.profile__description').textContent;*/ //значение плейсхлдеров в HTML, при открытии попапа срабатывают функции подтягивающии значение полей
function formProfileEditSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupProfile);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

//закрытие попапа с фотографиями
/*function popupPlaceFullClose() {
    const popupPlaceFull = document.querySelector('#popup-place-full');
    const buttonPlaceFullToggle = popupPlaceFull.querySelectorAll('.popup__toggle');
    buttonPlaceFullToggle.forEach(function (item) {
        item.addEventListener('click', function () {
            popupPlaceFull.classList.toggle('popup_opened-place');
        })
    });
};
popupPlaceFullClose();*/

buttonPlaceFullToggle.addEventListener('click', function () {
    closePopup(popupPlaceFull);
});

buttonOpenPopupCreateCard.addEventListener('click', function () {
    openPopup(popupCreateNewCard);
});
buttonClosePopupCreateNewCard.addEventListener('click', function () {
    closePopup(popupCreateNewCard);
});
buttonEdit.addEventListener('click', function () {
    openPopup(popupProfile);
    addformProfileEditNamePlaceholder();
    addformProfileEditJobPlaceholder();
});
buttonPopupProfileToggle.addEventListener('click', function () {
    closePopup(popupProfile);
});
formProfileEdit.addEventListener('submit', formProfileEditSubmitHandler);
formElementPlace.addEventListener('submit', formPlaceSubmitHandler);
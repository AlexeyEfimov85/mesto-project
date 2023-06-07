// базовые карточки добавлены на страницу через скрипт
function initialCard() {
    const cardContainer = document.querySelector('.places');
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

    const cardElements = []; //Тема 6/13: Создание, добавление и удаление элементов в DOM → Урок 4/10
    for (let i = 0; i < initialCards.length; i++) {
        const cardTemplate = document.querySelector('#card').content;
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
        cardElement.querySelector('.card__image').src = initialCards[i].link;
        cardElement.querySelector('.card__title').textContent = initialCards[i].name;
        cardElements[i] = cardElement;
        cardElement.querySelector('.card__button').addEventListener('click', function (evt) {
            evt.target.classList.toggle('card__button_checked');
        });
        const popupPlaceFull = document.querySelector('#popup-place-full');

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
initialCard();
// модальное окно добавления места
let buttonCreate = document.querySelector('.profile__button-create');
let popupCreate = document.querySelector('#popup-place');
let buttonPlaceToggle = document.querySelector('#popup-place-toggle')
function placeCreate() {
    popupCreate.classList.toggle('popup_opened');
}
buttonCreate.addEventListener('click', placeCreate);
buttonPlaceToggle.addEventListener('click', placeCreate);
// добавление карточек и удаление добавленных карточек
function addCard(cardTitleInput, cardImageInput) {
    const cardContainerUserAdd = document.querySelector('.places');
    const cardTemplateUserAdd = document.querySelector('#card').content;
    const cardElementUserAdd = cardTemplateUserAdd.querySelector('.card').cloneNode(true);
    const popupPlaceFull = document.querySelector('#popup-place-full');
    cardElementUserAdd.querySelector('.card__image').src = cardImageInput;
    cardElementUserAdd.querySelector('.card__title').textContent = cardTitleInput;
    cardContainerUserAdd.prepend(cardElementUserAdd);
    cardElementUserAdd.querySelector('.card__button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__button_checked');
    });
    cardElementUserAdd.querySelector('.card__trash').addEventListener('click', function (evt) {
        evt.target.closest('.card').remove();
    });
    cardElementUserAdd.querySelector('.card__image').addEventListener('click', function () {
        popupPlaceFull.classList.toggle('popup_opened-place');
        popupPlaceFull.querySelector('#card-image').src = cardElementUserAdd.querySelector('.card__image').src;
        popupPlaceFull.querySelector('.popup__image-title').textContent = cardElementUserAdd.querySelector('.card__title').textContent;
    });
}

const formElementPlace = document.querySelector('#form-place');
const placeTitleInput = document.querySelector('#place-title');
const placeLinkInput = document.querySelector('#place-link');
function formPlaceSubmitHandler(evt) {
    evt.preventDefault();
    addCard(placeTitleInput.value, placeLinkInput.value);
    placeCreate();
    placeTitleInput.value = '';
    placeLinkInput.value = '';
}

formElementPlace.addEventListener('submit', formPlaceSubmitHandler);

// удаление карточек первоначальных карточек (почему то не работает для добавленных)
function cardDelete() {
    let cardDeleteButton = document.querySelectorAll('.card__trash');
    cardDeleteButton.forEach(function (item) {
        let cardItem = item.closest('.card');
        item.addEventListener('click', function () {
            cardItem.remove();
        })
    });
};
cardDelete();

//редактирование данных пользователя
let buttonEdit = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let buttonToggle = document.querySelector('.popup__toggle');
function edit() {
    popup.classList.toggle('popup_opened');
};
buttonEdit.addEventListener('click', edit);
buttonToggle.addEventListener('click', edit);
const formElement = document.querySelector('#form-profile');
const nameInput = formElement.querySelector('#user-name');
const jobInput = formElement.querySelector('#user-job');
nameInput.placeholder = document.querySelector('.profile__title').textContent;
jobInput.placeholder = document.querySelector('.profile__description').textContent;
function formSubmitHandler(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    edit();
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
}
formElement.addEventListener('submit', formSubmitHandler);
//закрытие попапа с фотографиями
function popupPlaceFullClose() {
    const popupPlaceFull = document.querySelector('#popup-place-full');
    let buttonPlaceFullToggle = popupPlaceFull.querySelectorAll('.popup__toggle');
    buttonPlaceFullToggle.forEach(function (item) {
        item.addEventListener('click', function () {
            popupPlaceFull.classList.toggle('popup_opened-place');
        })
    });
};
popupPlaceFullClose();
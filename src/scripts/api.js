import { cardContainerUserAdd, createCard } from "./cards";
import { userID } from "../index.js";
export function getCards() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-26/cards', {
    headers: {
      authorization: 'dff808ff-3720-4dec-bd88-6c3aa62f954a'
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((initialCards) => {
      initialCards.forEach(item => {
        const arr = item.likes;
        const newArr = arr.map(userid => {
          return userid._id;
        })
        const newNewArr = newArr.some(myId => {
          return myId === userID
        })
        cardContainerUserAdd.append(createCard(item.name, item.link, item.likes.length, item.owner._id, item._id, newNewArr));
      })
    }).catch((err) => {
      console.log(err);
    });

}
export function renderCard() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-26/cards', {
    headers: {
      authorization: 'dff808ff-3720-4dec-bd88-6c3aa62f954a'
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    }).catch((err) => {
      console.log(err);
    });
};

export function getProfileData() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-26/users/me', {
    headers: {
      authorization: 'dff808ff-3720-4dec-bd88-6c3aa62f954a'
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((profileData) => {
      document.querySelector('.profile__title').textContent = profileData.name;
      document.querySelector('.profile__description').textContent = profileData.about
      document.querySelector('.profile__avatar').src = profileData.avatar;
      return profileData;
    }).catch((err) => {
      console.log(err);
    });
};

export function renderProfileData(profileData) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-26/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'dff808ff-3720-4dec-bd88-6c3aa62f954a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profileData)
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    return res.json();
  }).then((profileData) => {
    document.querySelector('.profile__title').textContent = profileData.name;
    document.querySelector('.profile__description').textContent = profileData.about
    document.querySelector('.profile__avatar').src = profileData.avatar;
  }).catch((err) => {
    console.log(err);
  });
}

export function addCardToServer(cardData) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-26/cards', {
    method: 'POST',
    headers: {
      authorization: 'dff808ff-3720-4dec-bd88-6c3aa62f954a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cardData)
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    return res.json();
  })
    .then((cardData) => {
      cardContainerUserAdd.prepend(createCard(cardData.name, cardData.link, cardData.likes.length, cardData.owner._id, cardData._id));
    }).catch((err) => {
      console.log(err);
    });
}


export function sendLike(id) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-26/cards/likes/${id}`, {
    method: 'PUT',
    headers: {
      authorization: 'dff808ff-3720-4dec-bd88-6c3aa62f954a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify()
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }).catch((err) => {
    console.log(err);
  });
}

export function deleteLike(id) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-26/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: 'dff808ff-3720-4dec-bd88-6c3aa62f954a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify()
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }).catch((err) => {
    console.log(err);
  });
}

export function deleteCards(id) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-26/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: 'dff808ff-3720-4dec-bd88-6c3aa62f954a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify()
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    return res.json();
  }).catch((err) => {
    console.log(err);
  });
};


export function renderProfileAvatar(profileData) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-26/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: 'dff808ff-3720-4dec-bd88-6c3aa62f954a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profileData)
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    return res.json();
  }).then((profileData) => {
    document.querySelector('.profile__avatar').src = profileData.avatar;
  });
}
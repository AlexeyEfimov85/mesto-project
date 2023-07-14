import { cardContainerUserAdd, createCard } from "./cards";
import { nameInput, jobInput } from "./modal";
export let userID = '';
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
          return myId === '509490c5246b53b1359effd9'
        })
        //console.log(item.likes);
        //console.log(newNewArr);
        cardContainerUserAdd.append(createCard(item.name, item.link, item.likes.length, item.owner._id, item._id, newNewArr));
    })})
    
}


/*export function getlikesID() {return fetch('https://nomoreparties.co/v1/plus-cohort-26/cards ', {
  headers: {
    authorization: 'dff808ff-3720-4dec-bd88-6c3aa62f954a'
  }
})
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }).then((initialCards) => {
    initialCards.forEach(item => {
      const arr = item.likes;
      arr.forEach(userid => {
        //console.log(userid._id);
        array = userid._id;
      })
    });
  });
};*/

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
    })
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
      userID = profileData._id;
      console.log(userID);
     
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
  })
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
  })
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
  });
};

/*export function getProfileAvatar() {
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
      document.querySelector('.profile__avatar').src = profileData.avatar;
      console.log(profileData.avatar);
    });
};*/

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
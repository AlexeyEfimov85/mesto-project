import { checkResponse } from "./util";
export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26/',
  headers: {
    authorization: 'dff808ff-3720-4dec-bd88-6c3aa62f954a',
    'Content-Type': 'application/json',
  },
};
export function getCards() {
  return fetch(config['baseUrl'] + 'cards', {
    headers: config['headers']
  })
    .then(checkResponse)

}

export function getProfileData() {
  return fetch(config['baseUrl'] + 'users/me', {
    headers: config['headers']
  })
    .then(checkResponse)
};

export function renderProfileData(profileData) {
  return fetch(config['baseUrl'] + 'users/me', {
    method: 'PATCH',
    headers:  config['headers'],
    body: JSON.stringify(profileData)
  }).then(checkResponse)
}

export function addCardToServer(cardData) {
  return fetch(config['baseUrl'] + 'cards', {
    method: 'POST',
    headers:  config['headers'],
    body: JSON.stringify(cardData)
  }).then(checkResponse)

}


export function sendLike(id) {
  return fetch(`${config['baseUrl']}cards/likes/${id}`, {
    method: 'PUT',
    headers: config['headers'],
    body: JSON.stringify()
  }).then(checkResponse)
}

export function deleteLike(id) {
  return fetch(`${config['baseUrl']}cards/likes/${id}`, {
    method: 'DELETE',
    headers: config['headers'],
    body: JSON.stringify()
  }).then(checkResponse)
 
}

export function deleteCards(id) {
  return fetch(`${config['baseUrl']}cards/${id}`, {
    method: 'DELETE',
    headers: config['headers'],
    body: JSON.stringify()
  }).then(checkResponse)
};


export function renderProfileAvatar(profileData) {
  return fetch(config['baseUrl'] +  'users/me/avatar', {
    method: 'PATCH',
    headers: config['headers'],
    body: JSON.stringify(profileData)
  }).then(checkResponse)
    
}
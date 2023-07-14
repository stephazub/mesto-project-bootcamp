const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-10',
  headers: {
    authorization: 'f0c8e955-f497-444c-995d-f8a73ebe49d1',
    'Content-Type': 'application/json'
  },
}

import { checkResponse } from './utils';

//Обновление аватара пользователя

function editAvatar(avatarImage) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarImage
    })
  })
    .then(checkResponse)
}

export { editAvatar }


//Постановка и снятие лайка
function putLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    }
  })
    .then(checkResponse)
}

export { putLike }

function deleteLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    }
  })
    .then(checkResponse)
}

export { deleteLike }

//Удаление карточки
function deleteCard(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    }
  })
    .then(checkResponse)
}


export { deleteCard };


//Добавление новой карточки
function createNewCard(nameCard, linkCard) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameCard,
      link: linkCard
    })
  })
    .then(checkResponse)
}

export { createNewCard };


//Редактирование профиля
function sendUserInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(checkResponse)
}


export { sendUserInfo };

//Загрузка информации о пользователе с сервера

function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(checkResponse)
}

export { getUserInfo };

//Загрузка карточек с сервера
function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(checkResponse);
}

export { getInitialCards };

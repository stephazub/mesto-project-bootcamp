const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-10',
  headers: {
    authorization: 'f0c8e955-f497-444c-995d-f8a73ebe49d1',
    'Content-Type': 'application/json'
  },
  profileNameSelector: '.profile__name',
  profileAboutSelector: '.profile__subtitle',
  profileAvatarSelector: '.profile__avatar',
}


//Обновление аватара пользователя

function editAvatar(avatarImage) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarImage.src
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    })
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    })
}

export { createNewCard };


//Редактирование профиля
function sendUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: profileName.textContent,
      about: profileAbout.textContent
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}


export { sendUserInfo };

//Загрузка информации о пользователе с сервера
const profileName = document.querySelector(config.profileNameSelector);
const profileAbout = document.querySelector(config.profileAboutSelector);
const profileAvatar = document.querySelector(config.profileAvatarSelector);

function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      console.log(data);
      profileName.textContent = data.name;
      profileAbout.textContent = data.about;
      profileAvatar.setAttribute('src', data.avatar);
      profileAvatar.setAttribute('alt', data.name);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { getUserInfo };

//Загрузка карточек с сервера
function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      console.log(data)
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}

const cities = await getInitialCards();

export { cities };

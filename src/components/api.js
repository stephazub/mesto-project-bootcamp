const config = {
    baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-10',
    headers: {
      authorization: 'f0c8e955-f497-444c-995d-f8a73ebe49d1',
      'Content-Type': 'application/json'
    },
    profileNameSelector: '.profile__name',
    profileAboutSelector: '.profile__subtitle',
    profileAvatarSelector: '.profile__avatar'
  }


//Загрузка информации о пользователе с сервера
const profileName = document.querySelector(config.profileNameSelector);
const profileAbout = document.querySelector(config.profileAboutSelector);
const profileAvatar = document.querySelector(config.profileAvatarSelector);

function getUserInfo () {
  return fetch (`${config.baseUrl}/users/me`, {
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
    profileName.textContent = data.name;
    profileAbout.textContent = data.about;
    profileAvatar.setAttribute('src', data.avatar);
    profileAvatar.setAttribute('alt', data.name);
  })
  .catch((err) => {
    console.log(err);
  });
}

export {getUserInfo};

//Загрузка карточек с сервера
function getInitialCards () {
    return fetch (`${config.baseUrl}/cards`, {
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
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
const cities = await getInitialCards();

export {cities};
  
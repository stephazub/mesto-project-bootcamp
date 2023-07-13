import { closePopup } from './modal';
import { sendUserInfo, editAvatar } from './api';
import { data } from 'browserslist';

const profileForm = document.forms.info;
const profileInputName = profileForm.elements.name;
const profileInputDescription = info.elements.subtitle;
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar');
const popupProfile = document.querySelector('.popup_button_profile');

const avatarForm = document.forms.avatar;
const avatarInputLink = avatarForm.elements.link
const popupAvatar = document.querySelector('.popup_button_avatar');

const submitProfile = profileForm.elements.submit;
const submitAvatar = avatarForm.elements.submit;


function handleProfileFormSubmit(evt, data) {
  evt.preventDefault();
  profileName.textContent = data.name;
  profileSubtitle.textContent = data.about;
  
}


function setListenerProfileForm(form) {
  form.addEventListener('submit', function (evt) {
    renderLoading(true, submitProfile);
    sendUserInfo(profileInputName.value, profileInputDescription.value)
    .then((data) => {
      console.log(data);
      handleProfileFormSubmit(evt, data);
    })
    .then(closePopup(popupProfile))
    .catch(catchErr)
    .finally(() => { 
      renderLoading(false, submitProfile);
    });
  }
  )
}

export { setListenerProfileForm, profileForm };


//Обновление аватара пользователя
function handleAvatarFormSubmit(evt, data) {
  evt.preventDefault();
  profileAvatar.setAttribute('src', data.avatar);
}

function setListenerAvatarForm(form) {
  form.addEventListener('submit', function (evt) {
    renderLoading(true, submitAvatar);
    editAvatar(avatarInputLink.value)
      .then((data) => {
        console.log(data.avatar);
        handleAvatarFormSubmit(evt, data)
      })
      .then(closePopup(popupAvatar))
      .catch(catchErr)
      .finally(() => {
        renderLoading(false, submitAvatar);
      });
    avatarForm.reset();
  }
  )
}

export { setListenerAvatarForm, avatarForm };


function renderLoading(isLoading, submit) {
  if (isLoading) {
    submit.textContent = 'Сохранение...';
  } else {
    submit.textContent = 'Сохранить';
  }
}

export { renderLoading }


//Проверка ответа
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export {checkResponse};


//Ловим ошибку
function catchErr(err) {
  console.log(err)
}

export {catchErr}
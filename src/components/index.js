import '../styles/index.css';

//Шесть стартовых карточек с местами
//Создание новых мест
import { showSixCards, setListenerCreateForm, createForm } from './card';

//Закрытие модальных окон
//Открытие модальных окон
import { setListenerCloseModal, setListenerOpenModal, profileEditButton, popupProfile, popupAdd, createButton, editAvatarButton, popupAvatar } from './modal';

//Редактирование информации пользователя
import { setListenerProfileForm, profileForm, setListenerAvatarForm, avatarForm, catchErr } from './utils';

//Валидация форм
import { enableValidation } from './validate';

//Загрузка информации о пользователе с сервера
import { getUserInfo, getInitialCards } from './api';
import { data } from 'browserslist';

const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar');

export const myID = await getUserInfo().then((data) => {return data._id}).catch(catchErr);
console.log(myID);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileSubtitle.textContent = userData.about;
    profileAvatar.setAttribute('src', userData.avatar);
    profileAvatar.setAttribute('alt', userData.name);
    showSixCards(cards);
  })
  .catch(catchErr);

//Закрытие модальных окон
setListenerCloseModal();

//Открытие модальных окон
setListenerOpenModal(createButton, popupAdd);
setListenerOpenModal(profileEditButton, popupProfile);
setListenerOpenModal(editAvatarButton, popupAvatar);

//Редактирование информации пользователя
setListenerProfileForm(profileForm);

//Создание новых мест
setListenerCreateForm(createForm);

//Валидация форм
enableValidation({
  inputErrorClass: 'form__input_type_error',
  captionErrorClass: 'form__error_status_active',
  buttonInactiveClass: 'form__submit_status_inactive',
  formInputSelector: '.form__input',
  formSubmitSelector: '.form__submit',
  formSelector: '.form',
});

//Обновление аватара пользователя
setListenerAvatarForm(avatarForm);
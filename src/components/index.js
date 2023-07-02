import '../styles/index.css';

//Шесть стартовых карточек с местами
//Создание новых мест
import {showSixCards, setListenerCreateForm, createForm} from './card';

//Закрытие модальных окон
//Открытие модальных окон
import {setListenerCloseModal, setListenerOpenModal, profileEditButton, popupProfile, popupAdd, createButton} from './modal';

//Редактирование информации пользователя
import {setListenerProfileForm, profileForm} from './utils';

//Валидация форм
import {enableValidation} from './validate';


//Шесть стартовых карточек с местами
showSixCards();

//Закрытие модальных окон
setListenerCloseModal();

//Открытие модальных окон
setListenerOpenModal(createButton, popupAdd);
setListenerOpenModal(profileEditButton, popupProfile);

//Редактирование информации пользователя
setListenerProfileForm(profileForm);

//Создание новых мест
setListenerCreateForm(createForm);

//Валидация форм
enableValidation({
  inputErrorClass:'form__input_type_error',
  captionErrorClass: 'form__error_status_active',
  buttonInactiveClass: 'form__submit_status_inactive',
  formInputSelector: '.form__input',
  formSubmitSelector: '.form__submit',
  formSelector: '.form',
});

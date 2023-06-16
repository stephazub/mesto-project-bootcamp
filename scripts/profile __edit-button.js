/*Переменные*/

/*Открытие закрытие модального окна редактироания профиля*/
const profileEditButton = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const popupCloseButton  = document.querySelector('.popup__close-button');
/*Заполнение полей формы редактирования профиля информацией со страницы*/
const profileFormInputs = document.querySelectorAll('.form__input');
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formSubmit = document.querySelector('.form__submit');
const form = document.querySelector('.form');


/*Функции*/

/*Открытие закрытие модального окна редактироания профиля*/
/*Заполнение полей формы редактирования профиля информацией со страницы*/
function openPopup (popapElement) {
  popapElement.classList.add('popup_status_opened');
  profileFormInputs[0].value = profileName.textContent;
  profileFormInputs[1].value = profileSubtitle.textContent;
}

function closePopup (popapElement) {
    popapElement.classList.remove('popup_status_opened');
}

/*Редактирование имени и информации о себе*/
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileFormInputs[0].value;
  profileSubtitle.textContent = profileFormInputs[1].value;
  closePopup(popupElement);
}

/*События*/
/*Открытие закрытие модального окна редактироания профиля*/
profileEditButton.addEventListener('click', function() {
  openPopup(popupElement);
});

popupCloseButton.addEventListener('click', function() {
  closePopup(popupElement);
});

/*Редактирование имени и информации о себе*/
form.addEventListener('submit', handleFormSubmit); 
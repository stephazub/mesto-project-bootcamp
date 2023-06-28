/*### ПЕРЕМЕННЫЕ ###*/

/*Открытие закрытие модального окна редактироания профиля*/
const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_button_profile');
const popupAdd = document.querySelector('.popup_button_add');
const popupImg = document.querySelector('.popup_button_img');
const closeButtonProfile = document.querySelector('.popup__close-button_place_profile');
const closeButtonAdd = document.querySelector('.popup__close-button_place_add');
const closeButtonImg = document.querySelector('.popup__close-button_place_img');

/*Заполнение полей формы редактирования профиля информацией со страницы*/
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileForm = document.forms.info;
const profileInputName = profileForm.elements.name;
const profileInputDescription = info.elements.subtitle;
const createForm = document.forms.create;
const createInputName = createForm.elements.place;
const createInputLink = createForm.elements.link;

/*Добавление карточки*/
const createButton = document.querySelector('.profile__add-button')

/*Шесть карточек «из коробки»*/
const card = document.querySelector('.card');
const cards = document.querySelector('.elements');
const cities = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/*Открытие попапа с картинкой*/
const popupPhotoCaption = document.querySelector('.popup__caption');
const popupPhoto = document.querySelector('.popup__img');

/*### ФУНКЦИИ ###*/

/*Открытие модального окна редактироания профиля*/
function openPopup(popup) {
  popup.classList.add('popup_status_opened');
}

/*Редактирование профиля*/
function editProfileForm() {
  profileInputName.value = profileName.textContent;
  profileInputDescription.value = profileSubtitle.textContent;
}

/*Закрытие модального окна*/
function closePopup (popup) {
  popup.classList.remove('popup_status_opened');
}

/*Редактирование имени и информации о себе*/
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileSubtitle.textContent = profileInputDescription.value;
  closePopup(popupProfile);
}

/*Лайк карточки*/
function addLikeListener(cityCard) {
  cityCard.querySelector('.element__like').addEventListener('click', function (evt) {evt.target.classList.toggle('element__like_active')});
}

/*Удаление карточки*/
function addDeleteListener(cityCard) {
  cityCard.querySelector('.element__delete').addEventListener('click', function(evt) {evt.target.parentElement.remove()});
}

/*Открытие попапа с картинкой*/
function openImgPopap(cityCard, name, link) {
  cityCard.querySelector('.element__img').addEventListener('click', function() {
    openPopup(popupImg);
    popupPhotoCaption.textContent = name;
    popupPhoto.setAttribute('src', link);
  })
}

/*Создание карточки*/
function createCard(title, ref) {
  const cityCard = card.content.cloneNode(true);
  cityCard.querySelector('.element__mesto').textContent = title;
  cityCard.querySelector('.element__img').setAttribute('src', ref)
  cityCard.querySelector('.element__img').setAttribute('alt', title);
  addLikeListener(cityCard);
  addDeleteListener(cityCard);
  return cityCard;
}


/*Шесть карточек «из коробки»*/
function showSixCards () {
  cities.forEach((element) => {
    const cityCard = createCard(element.name, element.link);
    openImgPopap(cityCard, element.name, element.link);
    cards.append(cityCard);
  });
}

/*Добавление карточки*/
function handleCreateFormSubmit(evt) {
  evt.preventDefault();
  const cityCard = createCard(createInputName.value, createInputLink.value);
  openImgPopap(cityCard, createInputName.value, createInputLink.value)
  cards.prepend(cityCard);
  closePopup(popupAdd);
  createForm.reset();
}

/*### ВЫЗОВЫ ###*/
/*Шесть карточек «из коробки»*/
showSixCards();

/*Открытие модального окна редактироания профиля*/
profileEditButton.addEventListener('click', function() {
  openPopup(popupProfile);
  editProfileForm();
});

/*Закрытие модального окна редактироания профиля*/
closeButtonProfile.addEventListener('click', function() {
  closePopup(popupProfile);
});

/*Редактирование имени и информации о себе*/
profileForm.addEventListener('submit', handleProfileFormSubmit);

/*Открытие модального окна добавления карточки*/
createButton.addEventListener('click', function(){
  openPopup(popupAdd);
});

/*Закрытие модального окна добавления карточки*/
closeButtonAdd.addEventListener('click', function() {
  closePopup(popupAdd);
});

/*Добавление карточки*/
createForm.addEventListener('submit', handleCreateFormSubmit);

/*Закрытие модального окна добавления карточки*/
closeButtonImg.addEventListener('click', function() {
  closePopup(popupImg);
});


/*ВАЛИДАЦИЯ ФОРМ*/
/*const form = document.querySelector('.form');
const formInput = form.querySelector('.form__input');
const formError = document.querySelector(`.form__error_place_${createInputName.id}`);*/


const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.form__error_place_${inputElement.id}`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__error_status_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.form__error_place_${inputElement.id}`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__error_status_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add('form__submit_status_inactive');
  buttonElement.disabled = true;
} else {
  buttonElement.classList.remove('form__submit_status_inactive');
  buttonElement.disabled = false;
}
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation();


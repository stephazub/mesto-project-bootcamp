/*### ПЕРЕМЕННЫЕ ###*/

/*Открытие закрытие модального окна редактироания профиля*/
const profileEditButton = document.querySelector('.profile__edit-button');
const popupElement = document.querySelectorAll('.popup');
const popupCloseButton  = document.querySelectorAll('.popup__close-button');

/*Заполнение полей формы редактирования профиля информацией со страницы*/
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileForm = document.querySelector('.form_button_profile');
const profileInputs = document.querySelectorAll('.form__input_button_profile');
const createForm = document.querySelector('.form_button_create');
const createInputs = document.querySelectorAll('.form__input_button_create');

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
function openProfilePopup (popupElement) {
  popupElement[0].classList.add('popup_status_opened');
  profileInputs[0].value = profileName.textContent;
  profileInputs[1].value = profileSubtitle.textContent;
}

/*Закрытие модального окна*/
function closePopup (popupElement) {
    popupElement[0].classList.remove('popup_status_opened');
    popupElement[1].classList.remove('popup_status_opened');
    popupElement[2].classList.remove('popup_status_opened');
}

/*Редактирование имени и информации о себе*/
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputs[0].value;
  profileSubtitle.textContent = profileInputs[1].value;
  closePopup(popupElement);
}

/*Лайк карточки*/
function likeCard(cityCard) {
  cityCard.querySelector('.element__like').addEventListener('click', function (evt) {evt.target.classList.toggle('element__like_active')});
}

/*Удаление карточки*/
function deleteCard(cityCard) {
  cityCard.querySelector('.element__delete').addEventListener('click', function(evt) {evt.target.parentElement.remove()});
}

/*Открытие попапа с картинкой*/
function openImgPopap(cityCard, name, link) {
  cityCard.querySelector('.element__img').addEventListener('click', function() {
    popupElement[2].classList.add('popup_status_opened');
    popupPhotoCaption.textContent = name;
    popupPhoto.setAttribute('src', link);
  })
}

/*Шесть карточек «из коробки»*/
function showSixCards () {
  cities.forEach((element) => {
    const cityCard = card.content.cloneNode(true);
    cityCard.querySelector('.element__mesto').textContent = element.name;
    const name = cityCard.querySelector('.element__mesto').textContent;
    cityCard.querySelector('.element__img').src = element.link;
    const link = cityCard.querySelector('.element__img').src;
    likeCard(cityCard);
    deleteCard(cityCard);
    openImgPopap(cityCard, name, link);
    cards.append(cityCard);
  });
}


/*Открытие модального окна добавления карточки*/
function openCreatePopup (popupElement) {
  popupElement[1].classList.add('popup_status_opened');
}

/*Добавление карточки*/
function handleCreateFormSubmit(evt) {
  evt.preventDefault();
  const cityCard = card.content.cloneNode(true);
  cityCard.querySelector('.element__mesto').textContent = createInputs[0].value;
  const name = cityCard.querySelector('.element__mesto').textContent;
  cityCard.querySelector('.element__img').setAttribute('src', createInputs[1].value);
  const link = cityCard.querySelector('.element__img').src;
  likeCard(cityCard);
  deleteCard(cityCard);
  openImgPopap(cityCard, name, link)
  cards.prepend(cityCard);
  closePopup(popupElement);
}

/*### ВЫЗОВЫ ###*/
/*Шесть карточек «из коробки»*/
showSixCards();

/*Открытие модального окна редактироания профиля*/
profileEditButton.addEventListener('click', function() {
  openProfilePopup(popupElement);
});

/*Закрытие модального окна редактироания профиля*/
popupCloseButton[0].addEventListener('click', function() {
  closePopup(popupElement);
});

/*Редактирование имени и информации о себе*/
profileForm.addEventListener('submit', handleProfileFormSubmit);

/*Открытие модального окна добавления карточки*/
createButton.addEventListener('click', function(){
  openCreatePopup(popupElement)
});

/*Закрытие модального окна добавления карточки*/
popupCloseButton[1].addEventListener('click', function() {
  closePopup(popupElement);
});

/*Добавление карточки*/
createForm.addEventListener('submit', handleCreateFormSubmit);

/*Закрытие модального окна добавления карточки*/
popupCloseButton[2].addEventListener('click', function() {
  closePopup(popupElement);
});
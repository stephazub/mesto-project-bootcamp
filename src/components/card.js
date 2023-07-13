import { openPopup, closePopup } from './modal';
import { cities, createNewCard, deleteCard, putLike, deleteLike } from './api';
import { data } from 'autoprefixer';
import { renderLoading, catchErr } from './utils';
import {myID} from './index';

const createForm = document.forms.create;
const popupAdd = document.querySelector('.popup_button_add');
const popupImg = document.querySelector('.popup_button_img');
const createInputName = createForm.elements.place;
const createInputLink = createForm.elements.link;
const card = document.querySelector('.card');
const cards = document.querySelector('.elements');
const submitAdd = createForm.elements.submit;
const popupPhotoCaption = document.querySelector('.popup__caption');
const popupPhoto = document.querySelector('.popup__img');


function addLikeListener(cityCard, id, likeCounter) {
  cityCard.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
    if (evt.target.classList.contains('element__like_active')) {
      putLike(id)
      .catch(catchErr);
      likeCounter.textContent = Number(likeCounter.textContent) + 1;
    } else {
      deleteLike(id)
      .catch(catchErr);
      likeCounter.textContent = Number(likeCounter.textContent) - 1;
    }
  }
  );
}

function changeLike(cityCard, likesArray) {
  if (likesArray.some(function (e) { return e._id == myID })) {
    cityCard.querySelector('.element__like').classList.add('element__like_active');
  } else {
    cityCard.querySelector('.element__like').classList.remove('element__like_active');
  }
}


function addDeleteListener(cityCard, id) {
  cityCard.querySelector('.element__delete').addEventListener('click', function (evt) {
    deleteCard(id)
      .then(() => {
        evt.target.closest('.element').remove();
      })
      .catch(catchErr)
  });
}

function createCard(title, ref, likes, owner, id, likesArray) {
  const cityCard = card.content.cloneNode(true);
  cityCard.querySelector('.element__mesto').textContent = title;
  cityCard.querySelector('.element__img').setAttribute('src', ref)
  cityCard.querySelector('.element__img').setAttribute('alt', title);
  const likeCounter = cityCard.querySelector('.element__like-counter');
  likeCounter.textContent = likes;
  const cardTrash = cityCard.querySelector('.element__delete');
  hideTrash(cardTrash, owner);
  addLikeListener(cityCard, id, likeCounter);
  changeLike(cityCard, likesArray, likes)
  addDeleteListener(cityCard, id);
  openImgPopap(cityCard, title, ref);
  return cityCard;
}

function openImgPopap(cityCard, name, link) {
  cityCard.querySelector('.element__img').addEventListener('click', function () {
    openPopup(popupImg);
    popupPhotoCaption.textContent = name;
    popupPhoto.setAttribute('src', link);
    popupPhoto.setAttribute('alt', name);
  })
}

function showSixCards() {
  cities.forEach((element) => {
    const cityCard = createCard(element.name, element.link, element.likes.length, element.owner._id, element._id, element.likes);
    cards.append(cityCard);
  });
}

function handleCreateFormSubmit(evt, data) {
  evt.preventDefault();
  const cityCard = createCard(data.name, data.link, data.likes.length, data.owner._id, data._id, data.likes);
  cards.prepend(cityCard);
}

function setListenerCreateForm(form) {
  form.addEventListener('submit', function (evt) {
    renderLoading(true, submitAdd);
    createNewCard(createInputName.value, createInputLink.value)
      .then((data) => {
        handleCreateFormSubmit(evt, data);
      })
      .then(closePopup(popupAdd))
      .catch(catchErr)
      .finally(() => {
        renderLoading(false, submitAdd);
      })
    createForm.reset();
  });
}

export { showSixCards, setListenerCreateForm, createForm };

function hideTrash(cardTrash, owner) {
  if (owner !== myID) {
    cardTrash.style.display = 'none';
  }
}


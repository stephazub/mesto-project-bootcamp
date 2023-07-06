import {openPopup, closePopup} from './modal';
import {cities} from './api';

const createForm = document.forms.create;
const popupAdd = document.querySelector('.popup_button_add');
const popupImg = document.querySelector('.popup_button_img');
const createInputName = createForm.elements.place;
const createInputLink = createForm.elements.link;
const card = document.querySelector('.card');
const cards = document.querySelector('.elements');

const popupPhotoCaption = document.querySelector('.popup__caption');
const popupPhoto = document.querySelector('.popup__img');

function addLikeListener(cityCard) {
    cityCard.querySelector('.element__like').addEventListener('click', function (evt) {evt.target.classList.toggle('element__like_active')});
  }

function addDeleteListener(cityCard) {
    cityCard.querySelector('.element__delete').addEventListener('click', function(evt) {evt.target.parentElement.remove()});
  }

function createCard(title, ref) {
    const cityCard = card.content.cloneNode(true);
    cityCard.querySelector('.element__mesto').textContent = title;
    cityCard.querySelector('.element__img').setAttribute('src', ref)
    cityCard.querySelector('.element__img').setAttribute('alt', title);
    addLikeListener(cityCard);
    addDeleteListener(cityCard);
    openImgPopap(cityCard, title, ref);
    return cityCard;
  }
  
function openImgPopap(cityCard, name, link) {
    cityCard.querySelector('.element__img').addEventListener('click', function() {
      openPopup(popupImg);
      popupPhotoCaption.textContent = name;
      popupPhoto.setAttribute('src', link);
    })
  }

function showSixCards () {
    cities.forEach((element) => {
      const cityCard = createCard(element.name, element.link);
      cards.append(cityCard);
    });
  }

function handleCreateFormSubmit(evt) {
    evt.preventDefault();
    const cityCard = createCard(createInputName.value, createInputLink.value);
    cards.prepend(cityCard);
    closePopup(popupAdd);
    createForm.reset();
  }

function setListenerCreateForm (form) {
  form.addEventListener('submit', handleCreateFormSubmit);
}

export{showSixCards, setListenerCreateForm, createForm};
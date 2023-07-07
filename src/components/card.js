import {openPopup, closePopup} from './modal';
import {cities, createNewCard, deleteCard} from './api';

console.log(cities);

const createForm = document.forms.create;
const popupAdd = document.querySelector('.popup_button_add');
const popupImg = document.querySelector('.popup_button_img');
const createInputName = createForm.elements.place;
const createInputLink = createForm.elements.link;
const card = document.querySelector('.card');
const cards = document.querySelector('.elements');

const popupPhotoCaption = document.querySelector('.popup__caption');
const popupPhoto = document.querySelector('.popup__img');
const myID = '26cb9d3e86c0b7951030edec';


function addLikeListener(cityCard) {
    cityCard.querySelector('.element__like').addEventListener('click', function (evt) {evt.target.classList.toggle('element__like_active')});
  }

function addDeleteListener(cityCard, id) {
    cityCard.querySelector('.element__delete').addEventListener('click', function(evt) {
      //evt.target.parentElement.remove();
      deleteCard(id).then(() => {
        evt.target.parentElement.remove();
      });
    });
  }

function createCard(title, ref, likes, owner, id) {
    const cityCard = card.content.cloneNode(true);
    cityCard.querySelector('.element__mesto').textContent = title;
    cityCard.querySelector('.element__img').setAttribute('src', ref)
    cityCard.querySelector('.element__img').setAttribute('alt', title);
    cityCard.querySelector('.element__like-counter').textContent = likes;
    const cardTrash = cityCard.querySelector('.element__delete');
    hideTrash(cardTrash, owner);
    addLikeListener(cityCard);
    addDeleteListener(cityCard,id);
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
      const cityCard = createCard(element.name, element.link, element.likes.length, element.owner._id, element._id);
      cards.append(cityCard);
    });
  }

function handleCreateFormSubmit(evt, data) {
  evt.preventDefault();
    const cityCard = createCard(data.name, data.link, data.likes.length, data.owner._id, data._id);
    cards.prepend(cityCard);
    closePopup(popupAdd);
  }

function setListenerCreateForm (form) {
  form.addEventListener('submit', function (evt) {
     createNewCard(createInputName.value, createInputLink.value).then((data) => {
      handleCreateFormSubmit(evt, data);
    });
     createForm.reset();
  });
}

export{showSixCards, setListenerCreateForm, createForm};

function hideTrash(cardTrash, owner) {
  if (owner !== myID) {
    cardTrash.style.display = 'none';
  }
}
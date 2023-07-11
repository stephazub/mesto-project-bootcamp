const profileForm = document.forms.info;
const profileInputName = profileForm.elements.name;
const profileInputDescription = info.elements.subtitle;
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_button_profile');
const popupAdd = document.querySelector('.popup_button_add');
const createButton = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__avatar-button');
const popupAvatar = document.querySelector('.popup_button_avatar');

function editProfileForm() {
    profileInputName.value = profileName.textContent;
    profileInputDescription.value = profileSubtitle.textContent;
  }

function closePopup (popup) {
    removeListenerEscape();
    popup.classList.remove('popup_status_opened');
  }

function openPopup(popup) {
    popup.classList.add('popup_status_opened');
    setListenerEscape()
  }

function setListenerOpenModal(button, popup) {
  button.addEventListener('click', function(){
    openPopup(popup);
    const submitButon = document.querySelector('.form__submit');
    submitButon.classList.add('form__submit_status_inactive');
    submitButon.disabled = true;
    editProfileForm();
  });
}

function closeByEscape(evt) {
  if(evt.key == 'Escape') {
    const openedPopup = document.querySelector('.popup_status_opened');
    closePopup(openedPopup);
  }
}

function setListenerEscape() {
  document.addEventListener('keydown', closeByEscape);
}

function removeListenerEscape() {
  document.removeEventListener('keydown', closeByEscape);
}

function setListenerCloseModal () {
    const popupList = Array.from(document.querySelectorAll('.popup'));
    popupList.forEach((popupElement) => {
      const modalWindow = popupElement.querySelector('.overlay');
      const closeButton = popupElement.querySelector('.popup__close-button');
      popupElement.addEventListener( 'click', function (evt) {
        const withinBoundaries = evt.composedPath().includes(modalWindow);
        const closePlace = evt.composedPath().includes(closeButton);
        if (!withinBoundaries || closePlace) {
          closePopup(popupElement);
        }
      });
    });
  }

export{ closePopup,
        openPopup,
        setListenerCloseModal,
        setListenerOpenModal, 
        profileEditButton,
        popupProfile,
        popupAdd,
        createButton,
        editAvatarButton,
        popupAvatar
    };
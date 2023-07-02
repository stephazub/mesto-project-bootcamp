const profileForm = document.forms.info;
const profileInputName = profileForm.elements.name;
const profileInputDescription = info.elements.subtitle;
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_button_profile');
const popupAdd = document.querySelector('.popup_button_add');
const createButton = document.querySelector('.profile__add-button');

function editProfileForm() {
    profileInputName.value = profileName.textContent;
    profileInputDescription.value = profileSubtitle.textContent;
  }

function closePopup (popup) {
    popup.classList.remove('popup_status_opened');
  }

function openPopup(popup) {
    popup.classList.add('popup_status_opened');
  }

function setListenerOpenModal(button, popup) {
  button.addEventListener('click', function(){
    openPopup(popup);
  });
  button.addEventListener('click', function() {
    openPopup(popup);
    editProfileForm();
  });
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
      function setListenerEscape(evt) {
        if(evt.key == 'Escape') { 
          closePopup(popupElement);
          document.removeEventListener('keydown', setListenerEscape);
        }
      }
      document.addEventListener('keydown', setListenerEscape);
    });
  }

export{ closePopup,
        openPopup,
        setListenerCloseModal,
        setListenerOpenModal, 
        profileEditButton,
        popupProfile,
        popupAdd,
        createButton
    };
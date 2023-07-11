import { closePopup } from './modal';
import { sendUserInfo, editAvatar} from './api';

const profileForm = document.forms.info;
const profileInputName = profileForm.elements.name;
const profileInputDescription = info.elements.subtitle;
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupProfile = document.querySelector('.popup_button_profile');

const avatarForm = document.forms.avatar;
const avatarInputLink = avatarForm.elements.link
const avatarImage = document.querySelector('.profile__avatar');
const popupAvatar = document.querySelector('.popup_button_avatar');


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileSubtitle.textContent = profileInputDescription.value;
  closePopup(popupProfile);
}


function setListenerProfileForm(form) {
  form.addEventListener('submit', function (evt) {
    handleProfileFormSubmit(evt);
    sendUserInfo();
  }
  )
}

export { setListenerProfileForm, profileForm };


//Обновление аватара пользователя
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  avatarImage.setAttribute('src', avatarInputLink.value);
  closePopup(popupAvatar);
}

function setListenerAvatarForm(form) {
  form.addEventListener('submit', function (evt) {
    handleAvatarFormSubmit(evt);
    console.log(avatarImage.src);
    editAvatar(avatarImage)
    avatarForm.reset();
  }
  )
}

export { setListenerAvatarForm, avatarForm };
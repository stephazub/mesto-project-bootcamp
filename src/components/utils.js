import { closePopup } from './modal';
import { sendUserInfo } from './api';

const profileForm = document.forms.info;
const profileInputName = profileForm.elements.name;
const profileInputDescription = info.elements.subtitle;
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupProfile = document.querySelector('.popup_button_profile');


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileSubtitle.textContent = profileInputDescription.value;
  closePopup(popupProfile);
}


function setListenerProfileForm(form) {
  form.addEventListener('submit', function (evt) {
    handleProfileFormSubmit(evt);
    sendUserInfo()
  });
}

export { setListenerProfileForm, profileForm };

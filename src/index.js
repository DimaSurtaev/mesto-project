import './pages/index.css';
import
  {popupProfile,
  popupAdd,
  popupAddForm,
  elementContainer,
  popupCard,
  buttonPopupProfile,
  buttonPopupMesto,
  buttonClosepProfile,
  buttonCloseAdd,
  buttonCloseCard,
  mestoName,
  mestoLink,
  popupEditForm,
  nameInput,
  jobInput,
  name,
  job,
  formSelectorClass,
  inputSelectorClass,
  submitButtonSelectorClass,
  inactiveButtonClass,
  inputErrorClass,
  errorClass} from './components/utils.js'

import {addMesto} from './components/cards.js'


import {enableValidation,deactivateButton} from './components/validate.js';

import {openPopup,closePopup} from './components/modal.js';
 
/* открыть попапа профиля */
function openPropfilePopup() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;

  openPopup(popupProfile);
}
buttonPopupProfile.addEventListener('click', openPropfilePopup);

function submitPopupProfile  (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(popupProfile);

     
}
popupEditForm.addEventListener('submit', submitPopupProfile); 

/* Добавление массива карточек */
const initialCards = [
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

initialCards.forEach((item) => {
  renderPlace(item.name, item.link);
});
 
  // добавить место по данным формы
function addNewMesto(evt) {
  evt.preventDefault();
  renderPlace(mestoName.value, mestoLink.value);
  popupAddForm.reset();
  const button = popupAddForm.querySelector('.popup__button');
  button.setAttribute('disabled', 'disabled'); 
  button.classList.add('popup__button_disabled'); 
  closePopup(popupAdd);     
}
popupAddForm.addEventListener('submit', addNewMesto);

function renderPlace (mesto, link) {
    const mestoCard = addMesto(mesto, link);
    elementContainer.prepend(mestoCard);
} 

  /* слушатели на  открытие попапов */
buttonPopupProfile.addEventListener ('click', ()=> openPopup(popupProfile));
buttonPopupMesto.addEventListener ('click', ()=> openPopup(popupAdd));

/*слушатели на закрытие попапов */
buttonClosepProfile.addEventListener ('click', ()=> closePopup(popupProfile))
buttonCloseAdd.addEventListener ('click', ()=> closePopup(popupAdd))
buttonCloseCard.addEventListener('click',() => closePopup(popupCard));



enableValidation({
  formSelectorClass,
  inputSelectorClass,
  submitButtonSelectorClass,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
});

